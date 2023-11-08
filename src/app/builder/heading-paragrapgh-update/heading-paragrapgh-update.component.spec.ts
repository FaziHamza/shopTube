import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingParagrapghUpdateComponent } from './heading-paragrapgh-update.component';

describe('HeadingParagrapghUpdateComponent', () => {
  let component: HeadingParagrapghUpdateComponent;
  let fixture: ComponentFixture<HeadingParagrapghUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadingParagrapghUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadingParagrapghUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
