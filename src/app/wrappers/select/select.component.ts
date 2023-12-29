import { Component, OnInit, Output, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { NatsService } from 'src/app/builder/service/nats.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dynamic-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends FieldType<FieldTypeConfig> implements OnChanges {
  @Output() change = new EventEmitter<any>();
  selectedValue: any | null = null;
  requestSubscription: Subscription;
  constructor(private sharedService: DataSharedService, private cdr: ChangeDetectorRef,
    private natsService: NatsService,
  ) {
    super();

  }
  getIcon(value: any) {
    return (this.to.options as any)
      .find((i: any) => i.value === value)?.icon;
  }
  get list(): any {
    return this.to.options;
  }
  ngOnInit(): void {
    if (this.to['additionalProperties']?.borderRadius !== undefined) {
      document.documentElement.style.setProperty('--radius', this.to['additionalProperties']?.borderRadius);
      this.cdr.detectChanges();
    }
    this.loadData();
  }
  ngOnChanges(changes: any) {
    if (this.to['additionalProperties']?.borderRadius) {
      document.documentElement.style.setProperty('--radius', this.to['additionalProperties']?.borderRadius);
      this.cdr.detectChanges();
    }
  }
  log(value: any): void {
    this.formControl.patchValue(value);
  }
  onModelChange(event: any, model: any) {
    if (this.to['additionalProperties']?.borderRadius !== undefined) {
      document.documentElement.style.setProperty('--radius', this.to['additionalProperties']?.borderRadius);
      this.cdr.detectChanges();
    }
    this.sharedService.onChange(event, this.field,);
    // console.log(event, model, 'radio');
  }
  ngOnDestroy(): void {
    if (this.requestSubscription)
      this.requestSubscription.unsubscribe();
  }

  async loadData() {
    debugger
    if (this.to['eventActionconfig']?._id) {
      this.connectToNatsAndSubscribeSelect((data) => { });
      const obj: any = {
        ruleId: this.to['eventActionconfig']?._id,
      }
      await this.natsService.connectToNats(environment.natsUrl);
      console.log(`Req_Knex_getexecute_rules select start ${this.to['eventActionconfig']?._id} ${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`)
      this.natsService.publishMessage('Req_Knex_getexecute_rules', obj);
    }
  }
  async connectToNatsAndSubscribeSelect(callback: (data: any) => void) {
    try {
      await this.natsService.connectToNats(environment.natsUrl);
      console.log(`Res_Knex_getexecute_rules select start ${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`)
      await this.natsService.subscribeToSubject('Res_Knex_getexecute_rules', async (err, data) => {
        this.natsService.natsClose();
        console.log(`Res_Knex_getexecute_rules select end ${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`)
        if (err) {
          console.error('Error:', err);
          return;
        }
        const res = JSON.parse(data);
        if (res?.data) {
          this.processData(res?.data);
        }
      });
    } catch (error) {
      console.error('Error connecting to NATS:', error);
    }
  }

  processData(data: any) {
    if (data?.length > 0) {
      let propertyNames = Object.keys(data[0]);
      let result = data?.map((item: any) => {
        let newObj: any = {};
        let propertiesToGet: string[];
        if ('id' in item && 'name' in item) {
          propertiesToGet = ['id', 'name'];
        } else {
          propertiesToGet = Object.keys(item).slice(0, 2);
        }
        propertiesToGet.forEach((prop) => {
          newObj[prop] = item[prop];
        });
        return newObj;
      });

      let finalObj = result.map((item: any) => {
        return {
          label: item.name || item[propertyNames[1]],
          value: item.id || item[propertyNames[0]],
        };
      });
      this.field.props.options = finalObj;
    }
    // Your processing logic here
    return data;
  }
}
