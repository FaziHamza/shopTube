import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderLayoutComponent } from './builder-layout.component';

describe('BuilderLayoutComponent', () => {
  let component: BuilderLayoutComponent;
  let fixture: ComponentFixture<BuilderLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilderLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilderLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
