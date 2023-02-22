import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoice-template',
  templateUrl: './invoice-template.component.html',
  styleUrls: ['./invoice-template.component.scss']
})
export class InvoiceTemplateComponent implements OnInit {
  showDiscnt: boolean = false;
  showShipping: boolean = false;
  image: any;
  subTotal = 0;
  total : any = 0;
  newAmount = 0;
  balanceDue : any = 0;
  invoiceObject: any;
  @Input() invoiceData: any;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
    this.form = this.formBuilder.group({
      image: '',
      invoiceNumber: '',
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      shipTo: '',
      date: '',
      paymentTerms: '',
      dueDate: '',
      poNumber: '',
      notes: '',
      termsAndConditions: '',
      discount: 0,
      shipping: 0,
      tax: 0,
      amountPaid: 0,
    });
    // this.applyDisount();
    // this.findDueBalance();
    // this.findtax();
    if (this.invoiceData.invoiceChild.length > 0) {
      this.invoiceData.invoiceChild.forEach((element: any) => {
        if (element.type == 'gridList') {
          element.rowData.forEach((element1: any) => {
            if (element1.amount) {
              this.subTotal = this.subTotal + element1.amount
            }
          });
        }
      });
      this.total = this.subTotal;
      this.balanceDue = this.total;
    }
  }

  showDiscount() {
    this.showDiscnt = true;
  }

  shipping() {
    this.showShipping = true;
  }

  displayImage(event: any) {
    
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.image = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  removeImage() {
    this.image = "";
  }
  applyDisount() {
    
    var discount = this.subTotal * (this.form.value.discount / 100)
    this.total = this.subTotal - discount;
    this.newAmount = this.total;
    this.findtax();
  }

  findtax() {
    
    if (this.newAmount != 0) {
      var taxdeduction = this.newAmount * this.form.value.tax / 100;
      this.total = this.newAmount - taxdeduction;
      this.total = this.total.toFixed(2);
    }
    else {
      var taxdeduction = this.subTotal * this.form.value.tax / 100;
      this.total = this.subTotal - taxdeduction;
      this.total = this.total.toFixed(2);
    }
    // this.applyDisount();
  }

  findDueBalance() {
    this.balanceDue = this.total - this.form.value.amountPaid;
    this.balanceDue = this.balanceDue.toFixed(2);
  }



  openModal(content: any) {
    this.invoiceObject = {
      image: this.image,
      invoiceNumber: this.form.value.invoiceNumber,
      from: this.form.value.from,
      to: this.form.value.to,
      shipTo: this.form.value.shipTo,
      date: this.form.value.date,
      paymentTerms: this.form.value.paymentTerms,
      dueDate: this.form.value.dueDate,
      poNumber: this.form.value.poNumber,
      notes: this.form.value.notes,
      termsAndConditions: this.form.value.termsAndConditions,
      discount: this.form.value.discount,
      shipping: this.form.value.shipping,
      tax: this.form.value.tax,
      amountPaid: this.form.value.amountPaid,
      subTotal: this.subTotal,
      total: this.total,
      newAmount: this.newAmount,
      balanceDue: this.balanceDue,
      grid: '',
      heading: '',
    }
    if (this.invoiceData.invoiceChild.length > 0) {
      this.invoiceData.invoiceChild.forEach((element: any) => {
        if (element.type == 'gridList') {
          this.invoiceObject.grid = element;
        } else if (element.type == 'header') {
          this.invoiceObject.heading = element;
        }
      });
    }
    // this.modalService.open(content, { size: "xl", centered: true });
  }
}
