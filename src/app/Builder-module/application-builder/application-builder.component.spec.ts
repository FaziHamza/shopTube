import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationBuilderComponent } from './application-builder.component';

describe('ApplicationBuilderComponent', () => {
  let component: ApplicationBuilderComponent;
  let fixture: ComponentFixture<ApplicationBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
