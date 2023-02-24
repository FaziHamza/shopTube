import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRuleComponent } from './action-rule.component';

describe('ActionRuleComponent', () => {
  let component: ActionRuleComponent;
  let fixture: ComponentFixture<ActionRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
