import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoLayotPageComponent } from './demo-layot-page.component';

describe('DemoLayotPageComponent', () => {
  let component: DemoLayotPageComponent;
  let fixture: ComponentFixture<DemoLayotPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoLayotPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoLayotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
