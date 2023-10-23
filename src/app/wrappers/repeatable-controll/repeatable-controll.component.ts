import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FieldArrayType, FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { FormArray, FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'st-repeatable-controll',
  templateUrl: './repeatable-controll.component.html',
  styleUrls: ['./repeatable-controll.component.scss']
})
export class RepeatableControllComponent extends FieldType<FieldTypeConfig> {
  subscription: Subscription;
  myForm: FormGroup;
  icons: any = {

  }
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  imageUrl: any;
  imagePath = environment.nestImageUrl;
  constructor(public dataSharedService: DataSharedService, private formBuilder: FormBuilder, private applicationService: ApplicationService,
    private toastr: NzMessageService,
  ) {
    super();
  }
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      fieldGroups: this.formBuilder.array([]),
    });
    this.addFieldGroup(); // Add an initial field group
    this.dataSharedService.spectrumControlNull.subscribe(res => {
      if (res) {
        this.clearAllFieldGroups();
      }
    });
  }

  addFieldGroup() {
    const fieldGroup = this.formBuilder.group({
      manufacture: ['', Validators.required],
      model: ['', Validators.required],
      quantity: [0, Validators.required],
      serialnumber: ['', Validators.required],
      equipmentbroucher: ['', Validators.required],
      equipmentbroucher_base64: ['', Validators.required],
      customeclearenceid: ['', Validators.required],
    });

    this.fieldGroups.push(fieldGroup);
    this.dataSharedService.onChange(this.myForm.value.fieldGroups, this.field);
  }

  removeFieldGroup(index: number) {
    this.fieldGroups.removeAt(index);
    this.formControl.patchValue(this.myForm.value.fieldGroups);
  }

  get fieldGroups(): FormArray {
    return this.myForm.get('fieldGroups') as FormArray;
  }

  onModelChange(event: any, model: any) {
    if (this.myForm.value.fieldGroups.length > 0) {
      for (let index = 0; index < this.myForm.value.fieldGroups.length; index++) {
        if (this.myForm.value.fieldGroups[index]) {
          for (const key in this.myForm.value.fieldGroups[index]) {
            if (key.includes('_base64')) {
              if (this.myForm.value.fieldGroups[index][key]) {
                this.myForm.value.fieldGroups[index][key.split('_')[0]] = this.myForm.value.fieldGroups[index][key];
              }
            }
          }
        }
      }
    }
    this.dataSharedService.onChange(this.myForm.value.fieldGroups, this.field);
  }


  onFileSelected(event: any, index: number) {
    const file: File = event.target.files[0];
    this.uploadFile(file, index);
  }

  uploadFile(file: File, index: number) {
    debugger
    const formData = new FormData();
    formData.append('image', file);
    this.applicationService.uploadS3File(formData).subscribe({
      next: (res) => {
        this.icons['prefixIcon'] = 'eye';
        this.icons['suffixIcon'] = 'delete';
        // this.myForm.value.fieldGroups[index]['equipmentbroucher'] = this.imagePath + res.path;
        this.myForm.value.fieldGroups[index]['equipmentbroucher_base64'] = this.imagePath + res.path;
        this.fieldGroups.at(index).get('equipmentbroucher_base64')?.setValue(this.imagePath + res.path);
        // this.fieldGroups.at(index).get('equipmentbroucher')?.setValue(this.imagePath + res.path);
        this.onModelChange(null, null)
        console.log('File uploaded successfully:', res);
      },
      error: (err) => {
        this.toastr.success('Erro in repeatable controll file upload : ' + err, {
          nzDuration: 3000,
        });
        console.error('Error uploading file:', err);
      }
    });



    // const reader = new FileReader();
    // if (file) {
    //   if (file.type === 'application/json') {
    //     reader.onload = () => {
    //       const base64Data = reader.result as string;
    //       const makeData = JSON.parse(base64Data);
    //       let data = makeData.screenData ? makeData.screenData : makeData;
    //       const currentData = JSON.parse(
    //         JSON.stringify(data, function (key, value) {
    //           if (typeof value === 'function') {
    //             return value.toString();
    //           } else {
    //             return value;
    //           }
    //         }) || '{}'
    //       );
    //       // this.formControl.setValue(JSON.stringify(currentData));
    //       // this.dataSharedService.onChange(JSON.stringify(currentData), this.field);
    //       this.myForm.value.fieldGroups[index]['equipmentBroucher'] = currentData;
    //       this.myForm.value.fieldGroups[index]['equipmentBroucher_base64'] = currentData;
    //       this.fieldGroups.at(index).get('equipmentBroucher_base64')?.setValue(currentData);
    //       this.fieldGroups.at(index).get('equipmentBroucher')?.setValue('');
    //       this.onModelChange(null, null)
    //     };

    //     reader.readAsText(file); // Read the JSON file as text
    //   }
    //   else {
    //     reader.readAsDataURL(file); // Read other types of files as data URL (base64)
    //     reader.onload = () => {
    //       const base64Data = reader.result as string;
    //       this.dataSharedService.imageUrl = base64Data;
    //       this.myForm.value.fieldGroups[index]['equipmentBroucher'] = base64Data;
    //       this.myForm.value.fieldGroups[index]['equipmentBroucher_base64'] = base64Data;
    //       this.fieldGroups.at(index).get('equipmentBroucher_base64')?.setValue(base64Data);
    //       this.fieldGroups.at(index).get('equipmentBroucher')?.setValue('');
    //       this.onModelChange(null, null)
    //       // this.formControl.setValue(base64Data);
    //       // this.dataSharedService.onChange(base64Data, this.field);
    //     };
    //   }

    //   reader.onerror = (error) => {
    //     console.error('Error converting file to base64:', error);
    //   };
    // }

  }
  // Function to clear the selected file and reset the form control value
  clearAllFieldGroups() {
    // Reset all form controls in the formArray
    this.fieldGroups.controls.forEach(control => {
      control.reset();
    });
  }

  clearFieldGroup(index: number) {
    // Reset the form control at the specified index
    this.fieldGroups.at(index).reset();
  }
  clearFile(index: any) {
    this.icons['suffixIcon'] = '';
    this.icons['prefixIcon'] = '';
    this.fieldGroups.at(index).get('equipmentbroucher')?.setValue('');
    this.fieldGroups.at(index).get('equipmentbroucher_base64')?.setValue('');
  }
  imagePreview(index: any) {
    window.open(this.myForm.value.fieldGroups[index]['equipmentbroucher_base64'], '_blank');
  }
}
