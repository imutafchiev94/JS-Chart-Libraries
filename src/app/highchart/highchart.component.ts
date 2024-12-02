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
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'line', // Line chart
    },
    title: {
      text: 'Test Chart',
    },
    xAxis: {
      type: 'datetime', // Time-based X-axis
      title: {
        text: 'Time',
      },
    },
    yAxis: {
      title: {
        text: '%',
      },
    },
    legend: {
      enabled: true, // Ensure legend is displayed
    },
    tooltip: {
      formatter: function () {
        return `Series: ${this.series.name}<br>Time: ${Highcharts.dateFormat('%H:%M', Number(this.x))}<br>Value: ${this.y}`;
      },
    },
    plotOptions: {
      series: {
        events: {
          legendItemClick: function () {
            const selectedSeries = this;
            this.chart.series.forEach((s) => {
              if (s !== selectedSeries) {
                // Dim other series
                s.update(
                  {
                    visible: true,
                    color: s.color ? Highcharts.color(s.color).setOpacity(0.2).get() : undefined,
                  } as any, // Cast to any to avoid type errors
                  false // Do not redraw yet
                );
              } else {
                // Highlight the selected series
                s.update(
                  {
                    visible: true,
                    color: s.color ? Highcharts.color(s.color).setOpacity(1).get() : undefined,
                  } as any, // Cast to any to avoid type errors
                  false // Do not redraw yet
                );
              }
            });
          
            // Redraw the chart after updates
            this.chart.redraw();
          
            return false; // Prevent default legend behavior
          },
        },
      },
    },
    series: [
      {
        name: 'Series 1',
        data: [
          [Date.UTC(2024, 11, 2, 18, 0), 10],
          [Date.UTC(2024, 11, 2, 20, 0), 12],
          [Date.UTC(2024, 11, 2, 22, 0), 15],
          [Date.UTC(2024, 11, 3, 0, 0), 20],
        ].filter(([x, y]) => x !== undefined && y !== undefined),
        type: 'line',
      },
      {
        name: 'Series 2',
        data: [
          [Date.UTC(2024, 11, 2, 18, 0), 15],
          [Date.UTC(2024, 11, 2, 20, 0), 18],
          [Date.UTC(2024, 11, 2, 22, 0), 20],
          [Date.UTC(2024, 11, 3, 0, 0), 25],
        ].filter(([x, y]) => x !== undefined && y !== undefined),
        type: 'line',
      },
      {
        name: 'Series 3',
        data: [
          [Date.UTC(2024, 11, 2, 18, 0), 5],
          [Date.UTC(2024, 11, 2, 20, 0), 7],
          [Date.UTC(2024, 11, 2, 22, 0), 10],
          [Date.UTC(2024, 11, 3, 0, 0), 12],
        ].filter(([x, y]) => x !== undefined && y !== undefined),
        type: 'line',
      },
    ],
  };

  constructor() { }

  ngOnInit(): void {}


  // Reference to the chart
  public chart: Highcharts.Chart | undefined;

  // Save the chart instance after it is created
  saveChart(chartInstance: Highcharts.Chart): void {
    this.chart = chartInstance;
  }
}
