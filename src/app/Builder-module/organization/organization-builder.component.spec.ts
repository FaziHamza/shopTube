import { ComponentFixture, TestBed } from '@angular/core/testing';

import { organizationBuilderComponent } from './organization-builder.component';

describe('organizationComponent', () => {
  let component: organizationBuilderComponent;
  let fixture: ComponentFixture<organizationBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ organizationBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(organizationBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
