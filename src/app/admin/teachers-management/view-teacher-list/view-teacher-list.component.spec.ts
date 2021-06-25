import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeacherListComponent } from './view-teacher-list.component';

describe('ViewTeacherListComponent', () => {
  let component: ViewTeacherListComponent;
  let fixture: ComponentFixture<ViewTeacherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTeacherListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeacherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
