import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneOnOneChatComponent } from './one-on-one-chat.component';

describe('OneOnOneChatComponent', () => {
  let component: OneOnOneChatComponent;
  let fixture: ComponentFixture<OneOnOneChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneOnOneChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneOnOneChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
