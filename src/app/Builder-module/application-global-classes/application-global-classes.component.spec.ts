import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationGlobalClassesComponent } from './application-global-classes.component';

describe('ApplicationGlobalClassesComponent', () => {
  let component: ApplicationGlobalClassesComponent;
  let fixture: ComponentFixture<ApplicationGlobalClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationGlobalClassesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationGlobalClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
