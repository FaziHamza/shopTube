import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebMenuComponent } from './web-menu.component';

describe('WebMenuComponent', () => {
  let component: WebMenuComponent;
  let fixture: ComponentFixture<WebMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
