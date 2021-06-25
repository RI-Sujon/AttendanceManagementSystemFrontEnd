import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegistrationModuleComponent } from './admin-registration-module.component';

describe('AdminRegistrationModuleComponent', () => {
  let component: AdminRegistrationModuleComponent;
  let fixture: ComponentFixture<AdminRegistrationModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegistrationModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegistrationModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
