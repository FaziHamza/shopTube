import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UIRuleComponent } from './uirule.component';

describe('UIRuleComponent', () => {
  let component: UIRuleComponent;
  let fixture: ComponentFixture<UIRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UIRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UIRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
