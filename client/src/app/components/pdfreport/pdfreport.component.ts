import { Component } from '@angular/core';
import {jsPDF} from 'jspdf';

@Component({
  selector: 'app-pdfreport',
  templateUrl: './pdfreport.component.html',
  styleUrls: ['./pdfreport.component.css']
})
export class PdfreportComponent {
 

  generatePDF(){
    try{
      let doc = new jsPDF()
      doc?.save('OrderDetails.pdf')
    }catch(err){
      console.error(err)
    }
    // doc.setFontSize(12)
    // doc.text(`Name:${this.saveDetails.name}`,20,yOffset)
    // yOffset += 10;
    // doc.text(`Contact:${this.saveDetails.contact}`,20,yOffset)
    // yOffset += 10;
    // doc.text(`Price:${this.saveDetails.price}`,20,yOffset)
    // yOffset += 10;
    // doc.text(`Quantity:${this.saveDetails.quantity}`,20,yOffset)
    // yOffset += 10;
    // doc.text(`Total:${this.saveDetails.total}`,20,yOffset)
    
  }

  viewPDF(){
    try{
      // console.log(doc)
      let doc = new jsPDF()
      if(doc){window.open(doc?.output('bloburl'),'_blank');} 
    }catch(err){
      console.error(err)
    }
  }

  onPrint(){
    try{
      let doc = new jsPDF()
      if(doc){
        doc.autoPrint()
        window.open(doc.output('bloburl'),'_blank')
      }
    }catch(err){
      console.error(err)
    }
  }
}
