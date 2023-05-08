import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBuilderComponent } from './company-builder.component';

describe('CompanyBuilderComponent', () => {
  let component: CompanyBuilderComponent;
  let fixture: ComponentFixture<CompanyBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
