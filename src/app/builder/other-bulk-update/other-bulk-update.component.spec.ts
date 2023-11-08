import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherBulkUpdateComponent } from './other-bulk-update.component';

describe('OtherBulkUpdateComponent', () => {
  let component: OtherBulkUpdateComponent;
  let fixture: ComponentFixture<OtherBulkUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherBulkUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherBulkUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
