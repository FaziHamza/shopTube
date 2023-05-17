import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebisteHeaderComponent } from './webiste-header.component';

describe('WebisteHeaderComponent', () => {
  let component: WebisteHeaderComponent;
  let fixture: ComponentFixture<WebisteHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebisteHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebisteHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
