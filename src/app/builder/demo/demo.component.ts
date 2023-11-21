import { Component, OnInit } from '@angular/core';
import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper';

@Component({
  selector: 'st-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  ZebraBrowserPrintWrapper = require('zebra-browser-print-wrapper');


  ngOnInit(): void {
  }

  printBarcode = async (serial: any) => {
    try {

      // Create a new instance of the object
      const browserPrint = new ZebraBrowserPrintWrapper();

      // Select default printer
      const defaultPrinter = await browserPrint.getDefaultPrinter();

      // Set the printer
      browserPrint.setPrinter(defaultPrinter);

      // Check printer status
      const printerStatus = await browserPrint.checkPrinterStatus();

      // Check if the printer is ready
      if (printerStatus.isReadyToPrint) {

        // ZPL script to print a simple barcode
        const zpl = `^XA
        ^MMT
        ^PW406
        ^LL0203
        ^LS0
        ^FT160,168^BQN,2,4
        ^FH\^FDLA,https://s3.me-south-1.amazonaws.com/campaigns.expocitydubai.com/pdfs/generated_pdf_1700311607606.pdf ^FS
        ^PQ1,0,1,Y
        ^XZ`;;

        browserPrint.print(zpl);
      } else {
        console.log("Error/s", printerStatus.errors);
      }

    } catch (error: any) {
      console.log(error)
      // throw new Error(error);
    }
  }
}
