import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestActionRuleComponent } from './test-action-rule.component';

describe('TestActionRuleComponent', () => {
  let component: TestActionRuleComponent;
  let fixture: ComponentFixture<TestActionRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestActionRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestActionRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
