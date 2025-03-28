import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements AfterViewInit {
  @ViewChild('pieChart') pieChart!: { nativeElement: HTMLCanvasElement };
  efficiency: number = 94;
  defected: number = 2000;
  not_defected: number = 8000;
  incrementDefected = 10;
  incrementNotDefected = 200;
  chart!: Chart; // Store chart instance

  ngOnInit() {
    setInterval(() => {
      this.defected += this.incrementDefected;
      this.not_defected += this.incrementNotDefected;
      this.updateChart();
    }, 2000);
  }

  ngAfterViewInit() {
    this.chart = new Chart(this.pieChart.nativeElement, {
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

  updateChart() {
    if (this.chart) {
      this.chart.data.datasets[0].data = [this.defected, this.not_defected];
      this.chart.update();
    }
  }
}
