import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-chart',
  templateUrl: './d3-chart.component.html',
  styleUrls: ['./d3-chart.component.css']
})
export class D3ChartComponent implements OnInit {
  @ViewChild('chartContainer', { static: true }) private chartContainer: ElementRef | undefined;

  private data: any[] = [
    { label: '2024-11-01', value: 15 },
    { label: '2024-11-02', value: 17 },
    { label: '2024-11-03', value: 14 },
    { label: '2024-11-04', value: 16 },
    { label: '2024-11-05', value: 18 },
    { label: '2024-11-06', value: 19 },
    { label: '2024-11-07', value: 20 }
  ];

  private chartType: string = 'bar'; // Default chart type

  constructor() {}

  ngOnInit(): void {
    this.drawChart();
  }

  // Method to switch chart type
  changeChartType(type: string): void {
    this.chartType = type;
    this.drawChart();
  }

  // Render the chart based on the selected type
  private drawChart(): void {
    const element = this.chartContainer?.nativeElement;
    d3.select(element).html(''); // Clear existing chart

    const width = element.offsetWidth; // Dynamic width based on the container's size
    const height = 300; // Static height

    if (this.chartType === 'bar') {
      this.drawBarChart(element, width, height);
    } else if (this.chartType === 'pie') {
      this.drawPieChart(element, width, height);
    } else if (this.chartType === 'line') {
      this.drawLineChart(element, width, height);
    }
  }

  // Function to draw a bar chart
  private drawBarChart(element: any, width: number, height: number): void {
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const x = d3.scaleBand()
      .domain(this.data.map(d => d.label))
      .range([0, width - margin.left - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.data, (d) => d.value) || 0])
      .nice()
      .range([height - margin.top - margin.bottom, 0]);

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.selectAll('.bar')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.label) || 0)
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - margin.top - margin.bottom - y(d.value));

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y));
  }

  // Function to draw a pie chart
  private drawPieChart(element: any, width: number, height: number): void {
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value((d: any) => d.value);
    const arc = d3.arc<d3.PieArcDatum<any>>()
      .innerRadius(0) // For pie chart, inner radius is 0
      .outerRadius(radius - 10);

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcs = svg.selectAll('g.arc')
      .data(pie(this.data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .style('fill', (d: any) => color(d.index.toString()));

    arcs.append('text')
      .attr('transform', (d: any) => `translate(${arc.centroid(d)})`)
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .text((d: any) => d.data.value);

      const legendRectSize = 20; // Size of the legend rectangles
      const legendSpacing = 5; // Space between legend items
    
      const legend = svg.selectAll('.legend')
        .data(this.data)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(${width / 2 + 100}, ${i * (legendRectSize + legendSpacing) - height / 4})`);
    
      // Create colored rectangles for the legend
      legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', (d, i) => color(i.toString()));
    
      // Add labels to the legend
      legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - 10)
        .style('text-anchor', 'start')
        .text((d: any) => d.label);
  }

  // Function to draw a line chart
  private drawLineChart(element: any, width: number, height: number): void {
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const x = d3.scaleLinear()
      .domain([0, this.data.length - 1])
      .range([0, width - margin.left - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.data, (d) => d.value) || 0])
      .nice()
      .range([height - margin.top - margin.bottom, 0]);

    const line = d3.line()
      .x((d: any, i: number) => x(i))
      .y((d: any) => y(d.value));

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.append('path')
      .data([this.data])
      .attr('class', 'line')
      .attr('d', line);

    svg.append('g')
      .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  }
}
