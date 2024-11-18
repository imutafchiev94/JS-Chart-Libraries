import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartJsComponent } from './chart-js/chart-js.component';
import { D3ChartComponent } from './d3-chart/d3-chart.component';
import { HighchartComponent } from './highchart/highchart.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'chart-js', component: ChartJsComponent }, // Replace with the correct component
  { path: 'd3', component: D3ChartComponent }, // Replace with the correct component
  { path: 'highchart', component: HighchartComponent }, // Replace with the correct component
  { path: '', redirectTo: '/', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
