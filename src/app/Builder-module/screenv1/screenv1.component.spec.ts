import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screenv1Component } from './screenv1.component';

describe('Screenv1Component', () => {
  let component: Screenv1Component;
  let fixture: ComponentFixture<Screenv1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Screenv1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Screenv1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
