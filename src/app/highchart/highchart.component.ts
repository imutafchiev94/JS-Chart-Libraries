import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import 'highcharts/highcharts-more'; // This is important for additional chart types like bubble, polarArea

@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.css']
})
export class HighchartComponent {
  
  public Highcharts = Highcharts;
  public chartOptions: Highcharts.Options = {
    chart: {
      type: 'bar', // Initial type is 'bar'
    },
    title: {
      text: 'Temperature By days'
    },
    xAxis: {
      categories: ["2024-11-01", "2024-11-02", "2024-11-03", "2024-11-04", "2024-11-05", "2024-11-06", "2024-11-07"],
      title: {
        text: 'Dates'
      }
    },
    yAxis: {
      title: {
        text: 'Temperature (°C)'
      }
    },
    series: [
      {
        type: 'bar',
        name: 'Temperature',
        data: [15, 17, 14, 16, 18, 19, 20],
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {}

  // Method to change chart type dynamically
  changeSeriesType(newType: 'bar' | 'line' | 'pie' | 'area'): void {
    if (this.chart) {
      // Dynamically update the chart series type
      this.chart.update({
        series: [
          {
            type: newType, // Ensure type is a valid series type like 'bar', 'line', 'pie', etc.
            name: 'Temperature',
            data: [15, 17, 14, 16, 18, 19, 20],
          },
        ],
      });
    }
  }

  // Reference to the chart
  public chart: Highcharts.Chart | undefined;

  // Save the chart instance after it is created
  saveChart(chartInstance: Highcharts.Chart): void {
    this.chart = chartInstance;
  }
}
