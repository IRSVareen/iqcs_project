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
  defected: Number = 2000;
  not_defected: Number = 8000; 

  constructor(private dataService: DataService) { }
  ngOnInit(){
    this.dataService.defected$.subscribe(value => {
      this.defected = value;
    });

    this.dataService.notDefected$.subscribe(value => {
      this.not_defected = value;
    });
  }

  generateTable() {
    let doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Analysis Report', 14, 20);

    const tableColumn = ['Material', 'Count'];
    const tableRows = [
      ['Defected', this.defected.toString()],
      ['Not Defected', this.not_defected.toString()]
    ];

    // Generate table
    autoTable(doc,{
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'grid'
    });
    return doc
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
