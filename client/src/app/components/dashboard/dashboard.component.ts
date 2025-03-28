import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild('pieChart') pieChart!: { nativeElement: HTMLCanvasElement };
  efficiency: number = 94;
  defected: number = 2000;
  not_defected: number = 8000;

  ngAfterViewInit() {
    new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Defect Products', 'Not Defect Products'],
        datasets: [{
          data: [this.defected, this.not_defected], 
          backgroundColor: ['white', 'black'],
          hoverBackgroundColor: ['#ff6666', '#66bb6a']
        }]
      }
    });
  }
}
