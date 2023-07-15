import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderDesignLayoutComponent } from './builder-design-layout.component';

describe('BuilderDesignLayoutComponent', () => {
  let component: BuilderDesignLayoutComponent;
  let fixture: ComponentFixture<BuilderDesignLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilderDesignLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilderDesignLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
