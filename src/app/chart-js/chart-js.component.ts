import { Component } from '@angular/core';
import { ChartType } from 'chart.js';  
import { ApiService } from '../api.service';

@Component({
  selector: 'app-chart-js',
  templateUrl: './chart-js.component.html',
  styleUrls: ['./chart-js.component.css']
})
export class ChartJsComponent {

  public chartType: ChartType = 'bar';

  public chartData = {
      labels: ["2024-11-01", "2024-11-02", "2024-11-03", "2024-11-04", "2024-11-05", "2024-11-06", "2024-11-07"],
      datasets: [
        {
          label: "Temperature (°C)",
          data: [15, 17, 14, 16, 18, 19, 20],
          fill: true,
          borderColor: "rgb(255, 99, 132)",
          tension: 0.1
        }
      ]
  };
  
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  public chartOptions = {
    responsive: true,
  };

  // Method to change chart type
  changeChartType(type: ChartType): void {
    this.chartType = type;
  }
}
