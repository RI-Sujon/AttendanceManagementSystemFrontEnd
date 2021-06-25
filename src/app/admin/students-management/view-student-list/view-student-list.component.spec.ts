import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentListComponent } from './view-student-list.component';

describe('ViewStudentListComponent', () => {
  let component: ViewStudentListComponent;
  let fixture: ComponentFixture<ViewStudentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
