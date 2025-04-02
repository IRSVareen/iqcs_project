import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pdfreport',
  templateUrl: './pdfreport.component.html',
  styleUrls: ['./pdfreport.component.css']
})
export class PdfreportComponent {
  efficiency: number = 94;
  defected: Number = 2000;
  not_defected: Number = 8000;
  machineWorking = false

  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.dataService.defected$.subscribe(value => {
      this.defected = value;
    });

    this.dataService.notDefected$.subscribe(value => {
      this.not_defected = value;
    });

    this.dataService.efficiency$.subscribe(value => {
      this.efficiency = value;
    })
    this.dataService.machineWorking$.subscribe(val =>{
      this.machineWorking = val
    })
    const userRole = sessionStorage.getItem('role')

  }

  generateTable() {
    let doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Intelligent Quality Control System (IQCS)', 105, 15, { align: 'center' });

    const date = new Date().toLocaleDateString('en-GB');
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 14, 30);

    doc.setFontSize(16);
    doc.text('Analysis Report', 105, 45, { align: 'center'});

    doc.text(`Efficiency: ${this.efficiency}%`, 14, 65);

    
    const tableColumn = ['Material', 'Count'];
    const tableRows = [
      ['Defected', this.defected.toString()],
      ['Not Defected', this.not_defected.toString()]
    ];

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 80,
      theme: 'grid'
    });

    return doc;
  }


  generatePDF() {
    try {
      let doc = this.generateTable();
      doc?.save('Analysis_Report.pdf');
    } catch (err) {
      console.error(err);
    }
  }

  viewPDF() {
    try {
      let doc = this.generateTable();
      window.open(doc?.output('bloburl'), '_blank');
    } catch (err) {
      console.error(err);
    }
  }

  onPrint() {
    try {
      let doc = this.generateTable();
      doc.autoPrint();
      window.open(doc?.output('bloburl'), '_blank');
    } catch (err) {
      console.error(err);
    }
  }
}
