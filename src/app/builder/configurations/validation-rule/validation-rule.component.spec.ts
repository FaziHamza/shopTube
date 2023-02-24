import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationRuleComponent } from './validation-rule.component';

describe('ValidationRuleComponent', () => {
  let component: ValidationRuleComponent;
  let fixture: ComponentFixture<ValidationRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
