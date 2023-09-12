import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
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
  @Input() processData: (data: any[]) => any[];

  // Store the results from API
  data: any[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2,
    private el: ElementRef,
    private applicationService: ApplicationService,
  ) { }

  ngOnInit() {
    debugger
    this.bindEvents();
    this.loadOptions();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private bindEvents(): void {
    if (this.configs) {
      if (this.configs.length > 0) {
        this.configs?.forEach(config => {
          if (config?.event && config?.actions) {
            this.renderer.listen(this.viewContainer.element.nativeElement, config.event, () => {
              // alert(`${config.event.charAt(0).toUpperCase() + config.event.slice(1)} event triggered!`);
              config.actions.forEach(action => {
                this.loadAction = action;
                this.loadOptions();
                // this.executeAction(action);
              });
            });
          }
        });
      }
    }
  }


  private loadOptions(): void {
    if (this.loadAction) {
      if (this.loadAction && Object.keys(this.loadAction).length != 0) {
        this.executeAction(this.loadAction)
          .subscribe(response => {
            if (response) {
              this.data = response.data;
              // Process this.data
              if (this.processData) {
                this.data = this.processData(this.data);
              }
              // this.viewContainer.clear();

              // this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: this.data });
            } else {
              this.data = [];
              if (this.processData) {
                this.data = this.processData(this.data);
              }
            }
          });
      }
    }
  }

  private executeAction(action: Action): Observable<any> {
    const { _id, actionLink, data, headers, parentId } = action;
    return this.applicationService.callApi(`knex-query/getAction/${_id}`, actionLink, data, headers, parentId)
      .pipe(takeUntil(this.unsubscribe$));
  }
}

type LoadAction = Action;

type Action = {
  actionType: string;
  url: string;
  actionLink: string;
  data?: any;
  headers?: any;
  _id?: any;
  parentId?: any;
};
