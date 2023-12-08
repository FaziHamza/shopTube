import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxGraphNodeComponent } from './ngx-graph-node.component';

describe('NgxGraphNodeComponent', () => {
  let component: NgxGraphNodeComponent;
  let fixture: ComponentFixture<NgxGraphNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxGraphNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxGraphNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
