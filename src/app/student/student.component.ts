import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../model/course';
import { Student } from '../model/student';
import { CourseService } from '../shared/course.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public courses: Course[] = [] ;
  public student: Student | any ;

  constructor(private service: CourseService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!="student"){
      this.router.navigate(["student-login/loginModule"]);
    }
    this.student = localStorage.getItem('user') ;
    this.student = JSON.parse(this.student);
    this.loadCourses() ;
  }

  loadCourses(){
    console.log( this.student.studentName + "kk:" + this.student.bsseroll + "mobi" + this.student.email);
    
    this.service.getAllCourseByStudentRoll(this.student.bsseroll).subscribe(
      response => {
        this.courses = response ;
        console.log("succeed" );
      }
    );
  }

  openCourse(course: Course){
    this.service.storeCourseForEditCourseInfo = course ;
    this.router.navigate(["course/stream"]) ;
  }

}
