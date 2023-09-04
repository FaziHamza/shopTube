import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderDesignComponent } from './builder-design.component';

describe('BuilderDesignComponent', () => {
  let component: BuilderDesignComponent;
  let fixture: ComponentFixture<BuilderDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilderDesignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilderDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
