import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBuilderSideMenuComponent } from './app-builder-side-menu.component';

describe('AppBuilderSideMenuComponent', () => {
  let component: AppBuilderSideMenuComponent;
  let fixture: ComponentFixture<AppBuilderSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppBuilderSideMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppBuilderSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
