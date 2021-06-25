import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseBasicInfoComponent } from './edit-course-basic-info.component';

describe('EditCourseBasicInfoComponent', () => {
  let component: EditCourseBasicInfoComponent;
  let fixture: ComponentFixture<EditCourseBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCourseBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
