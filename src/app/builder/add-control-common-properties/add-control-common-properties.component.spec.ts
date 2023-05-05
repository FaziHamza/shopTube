import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddControlCommonPropertiesComponent } from './add-control-common-properties.component';

describe('AddControlCommonPropertiesComponent', () => {
  let component: AddControlCommonPropertiesComponent;
  let fixture: ComponentFixture<AddControlCommonPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddControlCommonPropertiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddControlCommonPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
