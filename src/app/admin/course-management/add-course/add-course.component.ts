import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/shared/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  constructor(public service: CourseService, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!='admin'){
      this.router.navigate(["admin-login/loginModule"]);
    }
  }

  addCourse(): void{
    this.service.createNewCourse().subscribe(
      (response: any)=>{
        if(response==true){
          this.snackBar.open("Course Created Successfully", "",{duration: 2000});
          this.service.formModel.reset() ;
          this.router.navigate(["admin/homepage"]) ;
        }
        else if(response=="T1 not founded"){
          console.log("================>" + response);
          
          this.snackBar.open("Teacher1 is not founded", "",{duration: 2000});
        }
        else if(response=="T2 not founded"){
          this.snackBar.open("Teacher2 is not founded", "",{duration: 2000});
        }
        else{
          this.snackBar.open("Something Wrong", "",{duration: 2000});
        }
      }
    ) ;
  }

}
