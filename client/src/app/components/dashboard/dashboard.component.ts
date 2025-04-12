import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('barChart') barChart!: { nativeElement: HTMLCanvasElement };

  efficiency: number = 94;
  defected: number = 0;
  not_defected: number = 0;
  machineWorking: boolean = false;
  chart! :Chart
  connected = false
  
  constructor(private dataService: DataService){ }
  ngOnInit(){
    this.dataService.connected$.subscribe(status => this.connected = status);

    this.dataService.defected$.subscribe(val =>{
      this.defected = val
      this.updateChart()
    })
    this.dataService.notDefected$.subscribe(val =>{
      this.not_defected = val
      this.updateChart()
    })
    this.dataService.efficiency$.subscribe(val =>{
      this.efficiency = val;
      this.updateChart();
    })
    this.dataService.machineWorking$.subscribe(val =>{
      this.machineWorking = val
    })
  }

  ngAfterViewInit() {
    this.chart = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Defected', 'Not Defected'],
        datasets: [{
          label: 'Product Quality Analysis', 
          data: [this.defected, this.not_defected], 
          backgroundColor: ['#ff8c00', '#2ed573'], 
          hoverBackgroundColor: ['#ff6666', '#66bb6a']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 100000
          }
        }
      }
    });
  }
  updateChart() {
    if (this.chart) {
      this.chart.data.datasets[0].data = [this.defected, this.not_defected];
      this.chart.update();
    }
  }
}
