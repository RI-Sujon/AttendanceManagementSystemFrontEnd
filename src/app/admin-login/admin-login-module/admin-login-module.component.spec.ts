import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoginModuleComponent } from './admin-login-module.component';

describe('AdminLoginModuleComponent', () => {
  let component: AdminLoginModuleComponent;
  let fixture: ComponentFixture<AdminLoginModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLoginModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoginModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
