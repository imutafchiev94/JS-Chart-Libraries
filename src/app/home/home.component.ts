import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  charts = [
    {
      title: 'Chart.Js',
      image: 'https://images.seeklogo.com/logo-png/55/2/chart-js-logo-png_seeklogo-551184.png', // Replace with your image path
      link: '/chart-js' // Replace with your route
    },
    {
      title: 'D3 Charts',
      image: 'https://raw.githubusercontent.com/d3/d3-logo/master/d3.png', // Replace with your image path
      link: '/d3' // Replace with your route
    },
    {
      title: 'HighChart',
      image: 'https://www.cdnlogo.com/logos/h/30/highcharts.svg', // Replace with your image path
      link: '/highchart' // Replace with your route
    }
  ];
}
