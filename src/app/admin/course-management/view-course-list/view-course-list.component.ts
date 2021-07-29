import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Course } from 'src/app/model/course';
import { CourseService } from 'src/app/shared/course.service';

@Component({
  selector: 'app-view-course-list',
  templateUrl: './view-course-list.component.html',
  styleUrls: ['./view-course-list.component.css']
})
export class ViewCourseListComponent implements OnInit {

  public courses: Course[] = [] ;

  constructor(private service: CourseService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!='admin'){
      this.router.navigate(["admin-login/loginModule"]);
    }
    
    this.loadCourses() ;
  }

  loadCourses(){
    this.service.getAllCourses().subscribe(
      response => {
        this.courses = response ;
      }
    );
  }

  openCourse(course: Course){
    this.service.storeCourseForEditCourseInfo = course ;
    this.router.navigate(["course/stream"]) ;
  }

  deleteCourse(course: Course){
    var courseId = course.courseId ;
    var batchNo = course.batchNo ;
  
    alert("Delete CourseId: " + courseId + "  Course Batch No: " + batchNo );

    this.service.deleteCourse(courseId, batchNo).subscribe(
      (response: any)=>{
        if(response==true)
        {
          this.snackBar.open(courseId + "(" + batchNo + ")" + " has been deleted successfully.", "",{duration: 2000});
          this.loadCourses() ;
        }else{
          this.snackBar.open("Something Wrong", "",{duration: 2000});
        }
    }
    );
  }

  editCourseBasicInfo(course: Course){
    this.service.storeCourseForEditCourseInfo = course ;
    this.router.navigate(["admin/course-management/edit-info/"]) ;
  }

}
