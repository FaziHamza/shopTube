import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRuleGridComponent } from './business-rule-grid.component';

describe('BusinessRuleGridComponent', () => {
  let component: BusinessRuleGridComponent;
  let fixture: ComponentFixture<BusinessRuleGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessRuleGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessRuleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
