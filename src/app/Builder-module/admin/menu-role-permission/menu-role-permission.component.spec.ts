import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRolePermissionComponent } from './menu-role-permission.component';

describe('MenuRolePermissionComponent', () => {
  let component: MenuRolePermissionComponent;
  let fixture: ComponentFixture<MenuRolePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuRolePermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuRolePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
