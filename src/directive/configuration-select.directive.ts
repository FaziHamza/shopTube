import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appConfigurableSelect]'
})
export class ConfigurableSelectDirective implements OnInit, OnDestroy {

  @Input('appConfigurableSelect') configs: Array<{ event: string, actions: Array<Action> }>;
  @Input() loadAction: LoadAction;
  @Input() templateRef: TemplateRef<any>;

  // Store the results from API
  data: [] = [];

  private unsubscribe$ = new Subject<void>();

  constructor(
    private applicationService: ApplicationService,
    private viewContainer: ViewContainerRef
  ) { }

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
        this.viewContainer.element.nativeElement.addEventListener(config.event, () => {
          config.actions.forEach(action => {
            this.executeAction(action);
          });
        });
      }
    });
  }

  private loadOptions(): void {
    if (this.loadAction) {
      this.executeAction(this.loadAction)
        .subscribe(response => {
          debugger
          this.data = response.data;
          this.viewContainer.clear();
       
          this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: this.data });
        });
    }
  }

  private executeAction(action: Action): Observable<any> {
    const { url, method, data, headers } = action;
    return this.applicationService.callApi(url, method, data, headers)
      .pipe(takeUntil(this.unsubscribe$));
  }
}

type LoadAction = Action;

type Action = {
  actionType: string;
  url: string;
  method: string;
  data?: any;
  headers?: any;
};
