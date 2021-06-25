import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/shared/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  constructor(public service: CourseService, public router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!='admin'){
      this.router.navigate(["admin-login/loginModule"]);
    }
  }

  addCourse(): void{
    this.service.createNewCourse().subscribe(
      (response: any)=>{
        if(response=true){
          this.service.formModel.reset() ;
          this.router.navigate(["admin/homepage"]) ;
        }
        else{
          console.log("account creation problem");
        }
      }
    ) ;
  }

}
