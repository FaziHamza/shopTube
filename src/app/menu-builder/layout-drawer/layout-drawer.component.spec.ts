import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDrawerComponent } from './layout-drawer.component';

describe('LayoutDrawerComponent', () => {
  let component: LayoutDrawerComponent;
  let fixture: ComponentFixture<LayoutDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
