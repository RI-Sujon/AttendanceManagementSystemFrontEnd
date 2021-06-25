import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseListComponent } from './view-course-list.component';

describe('ViewCourseListComponent', () => {
  let component: ViewCourseListComponent;
  let fixture: ComponentFixture<ViewCourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCourseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
