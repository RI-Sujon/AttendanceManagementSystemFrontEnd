import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeacherInfoComponent } from './edit-teacher-info.component';

describe('EditTeacherInfoComponent', () => {
  let component: EditTeacherInfoComponent;
  let fixture: ComponentFixture<EditTeacherInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTeacherInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeacherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
