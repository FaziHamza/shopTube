import { Directive, Input, ElementRef, Renderer2, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';

@Directive({
  selector: '[appConfigurableSelect]'
})
export class ConfigurableSelectDirective implements OnInit, OnDestroy {

  @Input('appConfigurableSelect') configs: Array<{ event: string, actions: Array<Action> }>;
  @Input() loadAction: LoadAction;

  private unsubscribe$ = new Subject<void>();

  constructor(private renderer: Renderer2, private el: ElementRef,
    private nzSelect: NzSelectComponent,
    private applicationService: ApplicationService) { }

  ngOnInit() {
    this.bindEvents();
    this.loadOptions();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private bindEvents(): void {
    this.configs?.forEach(config => {
      if (config?.event && config?.actions) {
        this.renderer.listen(this.el.nativeElement, config.event, () => {
          config.actions.forEach(action => {
            this.executeAction(action);
          });
        });
      }
    });
  }

  private loadOptions(): void {
    debugger

    if (this.loadAction) {
      this.executeAction(this.loadAction)
        .subscribe(response => {
          debugger
          this.populateOptions(response.data);
        });
    }
  }

  private executeAction(action: Action): Observable<any> {
    const { url, method, data, headers } = action;
    return this.applicationService.callApi(url, method, data, headers)
      .pipe(takeUntil(this.unsubscribe$));
  }

  private populateOptions(data: any): void {
    if (!data || !Array.isArray(data)) {
      return;
    }

    // Clear current options
    this.nzSelect.clearInput();

    // Add new options using ng-zorro-antd's NzOptionComponent
    data.forEach(item => {
      const option = this.renderer.createElement('nz-option');
      this.renderer.setProperty(option, 'nzLabel', item.text);
      this.renderer.setProperty(option, 'nzValue', item.value);
      this.renderer.appendChild(this.el.nativeElement, option);
    });
  }
}
type LoadAction = {
  actionType: string;
  url: string;
  method: string;
  data?: any;
  headers?: any;
};

type Action = {
  actionType: string;
  url: string;
  method: string;
  data?: any;
  headers?: any;
};
