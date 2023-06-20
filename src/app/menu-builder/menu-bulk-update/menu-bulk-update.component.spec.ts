import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBulkUpdateComponent } from './menu-bulk-update.component';

describe('MenuBulkUpdateComponent', () => {
  let component: MenuBulkUpdateComponent;
  let fixture: ComponentFixture<MenuBulkUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBulkUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBulkUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
