import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/model/course';
import { CourseStudent } from 'src/app/model/course_student';
import { CourseService } from 'src/app/shared/course.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  course: Course = new Course() ;
  public studentsOfCourse: CourseStudent [] = [] ;
  
  adminLoggedIn = false ;

  constructor(public service:CourseService, public router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("isLoggedIn")==null){
      this.router.navigate(["welcome-page"]) ;
    }

    this.course = this.service.storeCourseForEditCourseInfo ;
    
    if(this.course.courseId==""){
      this.router.navigate(["welcome-page"]) ;
    }

    if(localStorage.getItem("isLoggedIn")=='admin' || localStorage.getItem("isLoggedIn")=='teacher')
    {
      this.adminLoggedIn = true ;
    }

    this.course = this.service.storeCourseForEditCourseInfo ;
    
    this.loadStudentsOfCourse();
  }

  loadStudentsOfCourse(){
    this.service.getAllStudentOfCourse(this.course.courseId, this.course.batchNo).subscribe(
      response => {
        this.studentsOfCourse = response ;
        console.log("succeed" );
      }
    );
  }

  addStudentToCourse(){
    this.service.addStudentToCourse(this.course.courseId, this.course.batchNo).subscribe(
      (response: any)=>{
        if(response=true){
          this.service.formModel.reset() ;
          this.loadStudentsOfCourse() ;
        }
        else{
          console.log("account creation problem");
        }
      }
    ) ;
  }

  deleteStudentFromCourse(course_student: CourseStudent){
    var bsseRoll = course_student.studentBSSERoll ;
    this.service.deleteStudentFromCourse(this.course.courseId, this.course.batchNo, bsseRoll).subscribe(
      (response: any)=>{
        if(response==true)
        {
          console.log("deleted");
          this.loadStudentsOfCourse() ;
        }
    }
    );
  }

}
