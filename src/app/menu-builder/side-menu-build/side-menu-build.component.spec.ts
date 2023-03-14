import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuBuildComponent } from './side-menu-build.component';

describe('SideMenuBuildComponent', () => {
  let component: SideMenuBuildComponent;
  let fixture: ComponentFixture<SideMenuBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuBuildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
