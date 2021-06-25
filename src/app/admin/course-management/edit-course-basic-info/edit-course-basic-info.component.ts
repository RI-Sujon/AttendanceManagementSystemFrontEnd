import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/model/course';
import { CourseService } from 'src/app/shared/course.service';

@Component({
  selector: 'app-edit-course-basic-info',
  templateUrl: './edit-course-basic-info.component.html',
  styleUrls: ['./edit-course-basic-info.component.css']
})
export class EditCourseBasicInfoComponent implements OnInit {

  course: Course = new Course() ;
  
  constructor(public service: CourseService, public router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!='admin'){
      this.router.navigate(["admin-login/loginModule"]);
    }

    this.course = this.service.storeCourseForEditCourseInfo ;

    if(this.course.courseId == ""){
      this.router.navigate(["admin/homepage"]);
    }
  }

  editCourseBasicInfo(): void{
    this.service.editCourseBasicInfo(this.course.id).subscribe(
      (response: any)=>{
        if(response=true){
          this.service.formModel.reset() ;
          this.router.navigate(["admin/course-management/view-list"]) ;
        }
        else{
          console.log("nnn");
        }
      }
    ) ;
  }

  ngOnDestroy(): void{
    this.service.formModel.reset() ;
  }

}
