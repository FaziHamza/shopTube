import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'st-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent extends FieldType<FieldTypeConfig> {
  filteredOptions: any = [];
  constructor(private sharedService: DataSharedService) {
    super();
  }
  get list(): any {
    return this.to.options;
  }
  ngOnInit(): void {
    this.filteredOptions = this.to.options;
  }
  onChange(value: string): void {
    
    this.filteredOptions = this.list.filter((option : any) => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  onModelChange(event: any, model: any) {
    debugger
    this.sharedService.onChange(event, this.field);
    console.log(event, model);
  }

}
