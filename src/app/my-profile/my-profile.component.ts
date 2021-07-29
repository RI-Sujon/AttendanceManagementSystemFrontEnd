import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Student } from '../model/student';
import { Teacher } from '../model/teacher';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  student: Student | any ;
  teacher: Teacher | any ;

  userType: String | any ;

  oldPassword: String | any ;
  newPassword: String | any ;

  wantToChangePassword = false ;

  constructor(private service: CommonService, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userType = localStorage.getItem("isLoggedIn");
    if(this.userType=="teacher"){
      this.teacher = localStorage.getItem("user");

    }else if(this.userType=="student"){
      this.student = localStorage.getItem("user") ;
      this.student = JSON.parse(this.student);
    }
    else if(this.userType=="admin"){

    }
  }

  changePasswordToggle(){
    if(this.wantToChangePassword==true){
      this.wantToChangePassword = false ;
    }else{
      this.wantToChangePassword = true ;
    }
  }

  changePassword(){
    if(this.userType=="admin"){
      this.service.changeAdminPassword("admin", this.oldPassword, this.newPassword).subscribe(
        (res:any)=>{
          if(res==true){
            this.snackBar.open("Password Changed", "",{duration: 2000});
            this.router.navigate(["welcome-page"]);
          }else{
            this.snackBar.open("Something Wrong", "",{duration: 2000});
          }
        }
      );
    }
    else if(this.userType=="student"){
      this.service.changeStudentPassword(this.student.bsseroll + "", this.oldPassword, this.newPassword).subscribe(
        (res:any)=>{
          if(res==true){
            this.snackBar.open("Password Changed", "",{duration: 2000});
            this.router.navigate(["welcome-page"]);
          }else{
            this.snackBar.open("Something Wrong", "",{duration: 2000});
          }
        }
      );
    }
    else if(this.userType=="teacher"){
      this.service.changeAdminPassword( this.teacher.username, this.oldPassword, this.newPassword).subscribe(
        (res:any)=>{
          if(res==true){
            this.snackBar.open("Password Changed", "",{duration: 2000});
            this.router.navigate(["welcome-page"]);
          }else{
            this.snackBar.open("Something Wrong", "",{duration: 2000});
          }
        }
      );
    }
  }

}
