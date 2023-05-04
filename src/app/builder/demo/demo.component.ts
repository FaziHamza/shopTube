import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { filter, fromEvent, Subscription, take } from 'rxjs';
import { HttpClient } from "@angular/common/http";
// import { JsonService } from './json-service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  @ViewChild('userMenu') userMenu: TemplateRef<any>;

  overlayRef: OverlayRef | null;
  source: any;
  tableData: any;
  fileLogData: any;
  fileTemplateData: string;
  fileAlarmsData: string;
  file: any;
  title: string;
  columns: any;
  columnslist: any;
  colspanList: any;
  colspanRow: any;
  RowLevel1: any;
  RowLevel2: any;
  RowLevel3: any;
  listOfData: any;
  sub: Subscription;
  showContextMenu = false;
  // xPos = 0;
  // yPos = 0;
  // menuItems = [
  //   { label: 'Cut', action: () => { console.log('Cut clicked'); } },
  //   { label: 'Copy', action: () => { console.log('Copy clicked'); } },
  //   { label: 'Paste', action: () => { console.log('Paste clicked'); } }
  // ];
  constructor(private http: HttpClient,
    public viewContainerRef: ViewContainerRef,
    public overlay: Overlay,
  ) {

  }
  ngOnInit(): void {
    // document.addEventListener('contextmenu', event => {
    //   event.preventDefault();
    //   this.showContextMenu = true;
    //   this.xPos = event.clientX;
    //   this.yPos = event.clientY;
    // });

    // document.addEventListener('click', event => {
    //   this.showContextMenu = false;
    // });
  }

  open({ x, y }: MouseEvent, user ?: any) {
    this.close();
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    this.overlayRef.attach(
      new TemplatePortal(this.userMenu, this.viewContainerRef, {
        $implicit: user,
      })
    );

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter((event: any) => {
          const clickTarget = event.target as HTMLElement;
          return (
            !!this.overlayRef &&
            !this.overlayRef.overlayElement.contains(clickTarget)
          );
        }),
        take(1)
      )
      .subscribe(() => this.close());
  }

  delete(user: any) {
    // delete user
    this.close();
  }

  close() {
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }


}
