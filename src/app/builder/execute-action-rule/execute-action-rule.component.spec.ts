import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteActionRuleComponent } from './execute-action-rule.component';

describe('ExecuteActionRuleComponent', () => {
  let component: ExecuteActionRuleComponent;
  let fixture: ComponentFixture<ExecuteActionRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecuteActionRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecuteActionRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
