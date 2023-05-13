import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { filter, fromEvent, Subscription, take } from 'rxjs';
import { HttpClient } from "@angular/common/http";
// import { JsonService } from './json-service';
import * as formulajs from '@formulajs/formulajs' // import entire package

@Component({
  selector: 'st-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  @ViewChild('userMenu') userMenu: TemplateRef<any>;
  menuItems: any = [];


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
  isCollapsed = false;
  // xPos = 0;
  // yPos = 0;
  // menuItems = [
  //   { label: 'Cut', action: () => { console.log('Cut clicked'); } },
  //   { label: 'Copy', action: () => { console.log('Copy clicked'); } },
  //   { label: 'Paste', action: () => { console.log('Paste clicked'); } }
  // ];
  constructor(private http: HttpClient,
    public viewContainerRef: ViewContainerRef,) { }
  ngOnInit(): void {
    console.log("this is formula JS: "+formulajs.SUM([1, 2, 3]));
    this.menuItems = [
      {
        title: 'Navigation One',
        icon: 'mail',
        selected: true,
        children: [
          {
            title: 'Option 1'
          },
          {
            title: 'Option 2'
          }
        ]
      },
      {
        title: 'Navigation Two',
        icon: 'appstore',
        children: [
          {
            title: 'Option 5'
          },
          {
            title: 'Option 6'
          },
          {
            title: 'Submenu',
            children: [
              {
                title: 'Option 7'
              },
              {
                title: 'Option 8'
              }
            ]
          }
        ]
      },
      {
        title: 'Navigation Three',
        icon: 'setting',
        children: [
          {
            title: 'Option 9'
          },
          {
            title: 'Option 10'
          },
          {
            title: 'Option 11'
          }
        ]
      },
      {
        title: 'Navigation Four',
        icon: 'user'
        // This menu item has no children
      }
    ];
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

  // open({ x, y }: MouseEvent, user?: any) {
  //   this.close();
  //   const positionStrategy = this.overlay
  //     .position()
  //     .flexibleConnectedTo({ x, y })
  //     .withPositions([
  //       {
  //         originX: 'end',
  //         originY: 'bottom',
  //         overlayX: 'end',
  //         overlayY: 'top',
  //       },
  //     ]);

  //   this.overlayRef = this.overlay.create({
  //     positionStrategy,
  //     scrollStrategy: this.overlay.scrollStrategies.close(),
  //   });

  //   this.overlayRef.attach(
  //     new TemplatePortal(this.userMenu, this.viewContainerRef, {
  //       $implicit: user,
  //     })
  //   );

  //   this.sub = fromEvent<MouseEvent>(document, 'click')
  //     .pipe(
  //       filter((event: any) => {
  //         const clickTarget = event.target as HTMLElement;
  //         return (
  //           !!this.overlayRef &&
  //           !this.overlayRef.overlayElement.contains(clickTarget)
  //         );
  //       }),
  //       take(1)
  //     )
  //     .subscribe(() => this.close());
  // }

  // delete(user: any) {
  //   // delete user
  //   this.close();
  // }

  // close() {
  //   this.sub && this.sub.unsubscribe();
  //   if (this.overlayRef) {
  //     this.overlayRef.dispose();
  //     this.overlayRef = null;
  //   }
  // }


  language(a: any) {
    alert(a);
  }
  permission(a: any) {
    alert(a);

  }

  public items = [
    { name: 'John', otherProperty: 'Foo' },
    { name: 'Joe', otherProperty: 'Bar' }
  ];

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  // @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;


}
