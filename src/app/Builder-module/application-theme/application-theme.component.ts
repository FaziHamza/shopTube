import { ChangeDetectorRef, Component, ElementRef, Input, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { htmlTabsData } from 'src/app/ControlList';
import * as monaco from 'monaco-editor';
import Ajv, { ErrorObject } from 'ajv';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SocketService } from 'src/app/services/socket.service';
import { Guid } from 'src/app/models/guid';
import { ApplicationService } from 'src/app/services/application.service';


@Component({
  selector: 'st-application-theme',
  templateUrl: './application-theme.component.html',
  styleUrls: ['./application-theme.component.scss']
})
export class ApplicationThemeComponent {
  @Input() applicationList: any;
  selectedApplication: any;
  selectedTag: any;
  themename: string = '';
  editId = '';
  tagList: any[] = [
    "p", "input", 'button'
  ];
  form: FormGroup;
  isSubmit: boolean = false;
  loader: boolean = false;
  listOfData: any[] = [];
  listOfDisplayData: any[] = [];
  pageIndex: number = 1;
  pageSize: number = 6;
  start = 1;
  end = 10;
  formlyTypes: any = [];
  controllist: any = [];
  validationMessage: any[] = [];
  IsShowConfig: boolean = false;
  isEditorInitialized = false;
  visible: boolean = false;
  previewComponent: any = '';
  themeList: any[] = [];
  @ViewChild('editorRuleContainer', { static: false }) private _editorRuleContainer: ElementRef;
  @Input() codeEditorRuleInstance!: monaco.editor.IStandaloneCodeEditor;
  @Input() jsonSchema = {};
  languageId = 'styles.scss';
  selectedTheme: any = '';
  listOfColumns = [
    {
      name: 'NO',
      key: 'no',
      searchValue: '',
      hideSearch: true,
      visible: false
    },
    {
      name: 'APPLICATION',
      key: 'applicationname',
      searchValue: '',
      hideSearch: true,
      visible: false
    },
    {
      name: 'Theme Name',
      key: 'applicationname',
      searchValue: '',
      hideSearch: false,
      visible: false
    },
    {
      name: 'NAME',
      key: 'name',
      searchValue: '',
      hideSearch: false,
      visible: false
    },
    {
      name: 'TAG',
      key: 'tag',
      searchValue: '',
      hideSearch: false,
      visible: false
    },
    {
      name: 'CLASSES',
      key: 'classes',
      searchValue: '',
      hideSearch: false,
      visible: false
    },
    {
      name: 'ACTION',
      key: 'action',
      searchValue: '',
      hideSearch: true,
      visible: false
    },
  ];
  constructor(private fb: FormBuilder, private toastr: NzMessageService,
    private zone: NgZone, private modal: NzModalService,
    private socketService: SocketService,
    private applicationService: ApplicationService
  ) {
    this.form = this.fb.group({
      applicationid: ['', Validators.required], // Application is required
      tag: ['', Validators.required], // Tag is required
      classes: ['', Validators.required], // Classes is required
      name: ['', Validators.required], // Name is required
      themename: ['', Validators.required], // themename is required
    });
  }
  ngOnInit() {
    // this.getApplicationTheme();
    this.getApplicationList();
    this.makeFormlyTypeOptions(htmlTabsData[0]);
    this.getThemeList();
  }

  // ngAfterViewInit(): void {
  //   this.IsShowConfig = true;
  //   this.cdRef.detectChanges();

  //   // Delay the execution of initializeMonacoEditor by 1 second
  //   setTimeout(() => {
  //     if (this.IsShowConfig) {
  //       this.initializeMonacoEditor();

  //     }
  //   }, 1000); // 1000 milliseconds (1 second)
  // }


  save() {
    if (this.form.valid) {
      var ResponseGuid: any;
      const newGuid = Guid.new16DigitGuid();
      if (this.selectedTheme == this.form.value.themename) {
        if (this.editId == '') {
          if (this.listOfData.some(a => a.tag == this.form.value.tag)) {
            this.toastr.warning('This control already exist against this theme', { nzDuration: 3000 });
            return;
          }
        } else {
          if (this.listOfData.some(a => a.tag == this.form.value.tag && a.id != this.editId)) {
            this.toastr.warning('This control already exist against this theme', { nzDuration: 3000 });
            return;
          }
        }
      }
      const formValue = this.form.value;
      const app = this.applicationList.find((a: any) => a.id === formValue.applicationid);

      // const classNamesArray = formValue.classes.split(/\s+/).filter(Boolean);
      const obj = {
        ...formValue,
        name: formValue.name,
        tag: formValue.tag,
        applicationname: app?.name,
        classes: formValue?.classes,
        themename: formValue?.themename,
        controlname: formValue?.name,
      };

      if (this.editId == '') {
        const { newGuid, metainfocreate } = this.socketService.metainfocreate();
        ResponseGuid = newGuid;
        const Add = { [`applicationtheme`]: obj, metaInfo: metainfocreate }
        this.socketService.Request(Add);
      } else {
        const { newUGuid, metainfoupdate } = this.socketService.metainfoupdate(this.editId);
        ResponseGuid = newUGuid;
        const Update = { [`applicationtheme`]: obj, metaInfo: metainfoupdate };
        this.socketService.Request(Update)
      }

      this.loader = true;
      this.socketService.OnResponseMessage().subscribe({
        next: (res: any) => {
          if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
            res = res.parseddata.apidata;
            this.loader = false;
            if (res.isSuccess) {
              this.editId = '';
              this.form.reset();
              this.searchByTheme();
              this.getThemeList();
            } else {
              this.toastr.error(res.message, { nzDuration: 3000 });
            }
          }
        },
        error: (err) => {
          this.loader = false;
          this.toastr.error(`${err.error.message}`, { nzDuration: 3000 });
        },
      });
    }
    else {
      this.toastr.warning('Please enter data', { nzDuration: 3000 });
    }
  }

  getApplicationTheme() {
    this.loader = true;
    const { jsonData, newGuid } = this.socketService.makeJsonData('applicationTheme', 'GetModelType');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        console.log(res)
        if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          this.loader = false;
          if (res.isSuccess) {
            this.listOfData = res.data;
            this.listOfDisplayData = res.data;
            this.onPageIndexChange(1);
          } else
            this.toastr.warning(res.message, { nzDuration: 2000 });
        }
      },
      error: () => {
        this.loader = false;
        this.toastr.error('some error exception', { nzDuration: 2000 });
      },
    });
  }
  getThemeList() {
    const { jsonData, newGuid } = this.socketService.makeJsonData('applicationTheme', 'GetModelType');
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage().subscribe({
      next: (res: any) => {
        console.log(res)
        if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
          res = res.parseddata.apidata;
          if (res.isSuccess) {
            this.themeList = res?.data;
          } else
            this.toastr.warning(res.message, { nzDuration: 2000 });
        }
      },
      error: () => {
        this.loader = false;
        this.toastr.error('some error exception', { nzDuration: 2000 });
      },
    });
  }
  delete(id: any) {
    this.loader = true;
    var ResponseGuid: any;
    const { jsonData, newGuid } = this.socketService.deleteModelType('applicationtheme', id);
    ResponseGuid = newGuid;
    this.socketService.Request(jsonData);
    this.socketService.OnResponseMessage()
      .subscribe((res: any) => {
        if (res.parseddata.requestId == ResponseGuid && res.parseddata.isSuccess) {
          this.loader = false;
          res = res.parseddata.apidata;
          if (res.isSuccess) {
            this.searchByTheme();
          } else
            this.toastr.error(res.message, { nzDuration: 2000 });
        }
      });
  }
  edit(data: any) {
    this.editId = data.id;
    this.form.patchValue({
      applicationid: data?.applicationid,
      name: data?.controlname,
      tag: data?.tag,
      classes: data?.classes,
      themename: data?.themename,
    });
    this.selectedTheme = data?.themename;
  }
  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    this.updatefilesList();
  }

  updatefilesList(): void {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.start = start == 0 ? 1 : ((this.pageIndex * this.pageSize) - this.pageSize) + 1;
    this.listOfDisplayData = this.listOfData.slice(start, end);
    this.end = this.listOfData.length != 6 ? this.listOfDisplayData.length : this.pageIndex * this.pageSize;
  }

  showDeleteConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Record?',
      // nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzClassName: 'deleteRow',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete(id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  makeFormlyTypeOptions(node: any) {
    node.children.forEach((element: any) => {
      element.children.forEach((element1: any) => {
        (element1.children || []).forEach((element3: any) => {
          if (element3.parameter !== 'input' && (element3.parameter == 'insertButton'
            || element3.parameter == 'updateButton'
            || element3.parameter == 'deleteButton'
            || element3.parameter == 'dropdownButton'
            || element3.parameter == 'linkbutton'
            || element3.parameter == 'downloadButton'
            || element3.parameter == 'heading'
            || element3.parameter == 'paragraph'
            || element3.parameter == 'icon'
            || element3.parameter == 'imageUpload')
          ) {
            this.controllist.push({
              label: element3.label,
              value: element3.parameter,
            });
          }
        });
      });
    });

    // Add 'Input' type separately
    this.controllist.push({
      label: 'Input',
      value: 'input',
    });

  }

  getApplicationList() {
    // // Retrieve data from localStorage
    // const storedData = window.localStorage.getItem('applicationid')!;

    // // Check if storedData is not null before parsing
    // if (storedData !== null) {
    //   const appId = JSON.parse(storedData);

    //   this.loader = true;

    //   if (appId) {
    //     this.applicationService.getNestNewCommonAPIById(`cp/applicationtheme`, appId).subscribe(((res: any) => {
    //       this.loader = false;
    //       if (res) {
    //         this.applicationList = [{
    //           label: res.name,
    //           value: res.id
    //         }];
    //       } else {
    //         this.toastr.warning(res.message, { nzDuration: 2000 });
    //       }
    //     }), (error) => {
    //       this.loader = false;
    //       console.error('Error fetching application data:', error);
    //       // Handle error, show error message, etc.
    //     });
    //   }
    // }
    // else {
    //   // Handle the case where the data is null (not available in localStorage)
    //   console.error('Data not found in localStorage');
    //   // Handle accordingly, show a message, set default value, etc.
    // }
  }
  initializeMonacoEditor(): void {
    if (!this.isEditorInitialized) {
      if (this._editorRuleContainer) {
        // Try logging to see if the reference is available

      } else {
        console.log('editorRuleContainer is not available');
      }

      // if (this._editorActionsContainer) {
      //   console.log(this._editorActionsContainer.nativeElement);
      // } else {
      //   console.log('editorActionsContainer is not available');
      // }

      if (this.isEditorInitialized) {
        return;
      }
      // Define a JSON schema for suggestions
      monaco.editor.defineTheme('myCustomTheme', {
        base: 'vs', // can also be vs-dark or hc-black
        inherit: true, // can also be false to completely replace the built-in rules
        rules: [
          { token: 'comment', foreground: 'ffa500' },
          { token: 'string', foreground: '00ff00' },
          // more rules here
        ],
        colors: {
          // you can also set editor-wide colors here
          'editor.foreground': '#000000',
          'editor.background': '#f5f5f5',
          // and more
        }
      });

      // Register the JSON schema
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [{
          uri: 'mySchema',
          fileMatch: ['*'],
          schema: this.jsonSchema
        }]
      });

      this.codeEditorRuleInstance = monaco.editor.create(this._editorRuleContainer.nativeElement, {
        theme: 'myCustomTheme',
        language: this.languageId,
        value: this.form.value.classes // Initial value
      });


      this.codeEditorRuleInstance.addAction({
        id: 'validate-json',
        label: 'Validate JSON',
        run: () => {
          this.validateJSON(); // Call the validation method
        }
      });

      this.codeEditorRuleInstance.addAction({
        id: 'my-duplicate-action',
        label: 'Duplicate',
        keybindings: [monaco.KeyCode.F10],
        contextMenuGroupId: 'customActions',
        contextMenuOrder: 1.5,
        run: (ed: any) => {
          const selectedText = ed.getModel().getValueInRange(ed.getSelection());

          if (selectedText) {
            try {
              const selectedJson = JSON.parse(selectedText);

              if (selectedJson.if) {
                const content = ed.getValue();
                const updatedContent = this.duplicateIfObjectInContent(content, selectedJson);
                ed.setValue(updatedContent);
              }
            } catch (e) {
              console.error("Invalid JSON selected or other error:", e);
            }
          }
        }
      });

      this.addCustomButton();

      const editorInstance = this.codeEditorRuleInstance;

      editorInstance.onDidChangeModelContent(() => {
        // console.log(editorInstance.getValue());
        this.zone.run(() => {
          let value = editorInstance.getValue();
          this.form?.get('classes')?.patchValue(value);
        });
      });


      this.isEditorInitialized = true;

    } else {
      // this.codeEditorRuleInstance.layout();
      // this.codeEditorActionsInstance.layout();
    }
  }
  validateJSON() {

    this.validationMessage = [];
    try {
      const jsonData = JSON.parse(this.codeEditorRuleInstance.getValue());
      const ajv = new Ajv();
      const valid = ajv.validate(this.jsonSchema, jsonData);
      if (!valid && ajv.errors) {
        // Keep the original error objects, but add custom error messages
        this.validationMessage = ajv.errors.map(err => ({
          originalError: err,
          message: this.customErrorMessage(err)
        }));
      }
    } catch (error) {
      this.validationMessage.push({ message: 'Invalid JSON format.' });
    }
  }
  customErrorMessage(error: ErrorObject): string {
    if (error.keyword === 'enum' && error.instancePath.includes('conditions')) {
      const field = error.instancePath.split('/')[3];
      const allowedValues = error.params['allowedValues'] as string[] | undefined;
      if (allowedValues) {
        return `Invalid value for field '${field}'. Did you mean one of these? ${allowedValues.join(', ')}`;
      }
    } else if (error.keyword === 'type' && error.instancePath.endsWith('/value')) {
      const field = error.instancePath.split('/')[3];
      return `Invalid type for field '${field}'. The value must be a string.`;
    } else if (error.keyword === 'additionalProperties') {
      const propertyName = error.params['additionalProperty'];
      const validProperties = Object.keys(error.parentSchema?.['properties'] || {}).join(', ');
      return `Unknown property '${propertyName}'. Please choose from the following valid properties: ${validProperties}`;
    }
    return error.message || 'Unknown error';
  }
  duplicateIfObjectInContent(content: any, ifObjectToDuplicate: any) {
    const data = JSON.parse(content);
    const indexOfObject = data.findIndex((obj: any) => JSON.stringify(obj.if) === JSON.stringify(ifObjectToDuplicate));

    if (indexOfObject !== -1) {
      const newObject = { ...data[indexOfObject] };
      data.splice(indexOfObject + 1, 0, newObject);
    }

    return JSON.stringify(data, null, 2);
  }
  addCustomButton() {
    // Wait for the editor to be ready
    setTimeout(() => {
      // Find the toolbar in the Monaco Editor's DOM
      const toolbar = document.querySelector('.monaco-toolbar');

      // Create a button element
      const button = document.createElement('button');
      button.innerText = 'Validate JSON';
      button.className = 'my-custom-button'; // You can add styling with CSS

      // Add a click event listener to run your validation function
      button.addEventListener('click', () => {
        this.validateJSON();
      });

      // Append the button to the toolbar
      if (toolbar) {
        toolbar.appendChild(button);
      }
    }, 1000); // Adjust the timeout if necessary
  }
  preview(item: any) {
    let controlType = item.tag;
    controlType = item.tag == 'insertButton' || item.tag == 'insertButton' || item.tag == 'updateButton' || item.tag == 'deleteButton' ? 'button' : controlType;
    this.loader = true;
    this.applicationService.getNestCommonAPI(`controls/${controlType}`).subscribe(((apiRes: any) => {
      this.loader = false;
      if (apiRes.isSuccess) {
        if (apiRes.data) {
          let response = this.jsonParseWithObject(apiRes.data.controlJson);
          if (controlType == 'input') {
            response.formly[0].fieldGroup[0].props.additionalProperties['applicationThemeClasses'] = item.classes;
          } else {
            response['applicationThemeClasses'] = item.classes;
          }
          this.previewComponent = response;
          this.visible = true;
        } else {
          this.toastr.warning('No control found', { nzDuration: 2000 });
        }
      } else
        this.toastr.warning(apiRes.message, { nzDuration: 2000 });
    }));
  }
  searchValue(event: any, column: any): void {
    const inputValue = event?.target ? event.target.value?.toLowerCase() : event?.toLowerCase() ?? '';
    if (inputValue) {
      this.listOfDisplayData = this.listOfDisplayData.filter((item: any) => {
        const { key } = column;
        const { [key]: itemName } = item || {}; // Check if item is undefined, set to empty object if so
        return itemName?.toLowerCase()?.includes(inputValue); // Check if itemName is undefined or null
      });
    }
  }
  search(): void {
    this.listOfDisplayData = this.listOfData;
    let checkSearchExist = this.listOfColumns.filter(a => a.searchValue);
    if (checkSearchExist.length > 0) {
      checkSearchExist.forEach(element => {
        this.searchValue(element.searchValue, element)
      });
    }
  }
  close() {
    this.visible = false;
    this.previewComponent = '';
  }
  jsonParseWithObject(data: any) {
    return JSON.parse(data, (key, value) => {
      if (typeof value === 'string' && value.startsWith('(') && value.includes('(model)')) {
        return eval(`(${value})`);
      }
      return value;
    });
  }
  searchByTheme() {
    this.loader = true;
    this.form.patchValue({
      themename: this.selectedTheme,
    });
    if (this.selectedTheme) {
      const { jsonData, newGuid } = this.socketService.makeJsonDataById('applicationtheme', this.selectedTheme, 'GetModelTypeById');
      this.socketService.Request(jsonData);
      this.socketService.OnResponseMessage().subscribe({
        next: (res: any) => {
          if (res.parseddata.requestId == newGuid && res.parseddata.isSuccess) {
            this.loader = false;
            if (res.isSuccess) {
              this.listOfData = res.data;
              this.listOfDisplayData = res.data;
              this.onPageIndexChange(1);
            } else
              this.toastr.warning(res.message, { nzDuration: 2000 });
          }
        },
        error: (err) => {
          this.loader = false;
          this.toastr.error("An error occurred", { nzDuration: 3000 });
        }
      });
    } else {
      this.loader = false;
      this.toastr.warning('Please select theme', { nzDuration: 2000 });
    }
  }
}
