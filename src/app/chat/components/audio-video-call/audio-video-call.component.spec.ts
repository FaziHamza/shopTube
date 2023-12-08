import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioVideoCallComponent } from './audio-video-call.component';

describe('AudioVideoCallComponent', () => {
  let component: AudioVideoCallComponent;
  let fixture: ComponentFixture<AudioVideoCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioVideoCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioVideoCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
