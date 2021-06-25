import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../model/course';
import { Teacher } from '../model/teacher';
import { CourseService } from '../shared/course.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  public courses: Course[] = [] ;
  public teacher: Teacher | any ;

  constructor(private service: CourseService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!="teacher"){
      this.router.navigate(["admin-login/loginModule"]);
    }

    this.teacher = localStorage.getItem('user') ;
    this.teacher = JSON.parse(this.teacher);
    this.loadCourses() ;
  }

  loadCourses(){
    console.log("kk:" + this.teacher.username);
    this.service.getAllCourseByTeacherUserName(this.teacher.username).subscribe(
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
