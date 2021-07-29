import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-login-module',
  templateUrl: './login-module.component.html',
  styleUrls: ['./login-module.component.css']
})
export class LoginModuleComponent implements OnInit {

  constructor(public service: StudentService, public service2: CommonService, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!=null){
      this.router.navigate(["welcome-page"]);
    }
  }

  signIn(): void{
    this.service.studentSignInOperation().subscribe(
      (response: any)=>{
        if(response != null){
          if(response==false){
            this.snackBar.open("username && password doesnot match.", "",{duration: 2000});
          }
          else{
            localStorage.setItem('isLoggedIn', "student");
            localStorage.setItem('userToken', response.tokenString) ;
          
            this.service.getStudentBasicInfo().subscribe(
              (response: any)=>{
                if(response!=null){
                  localStorage.setItem('user', JSON.stringify(response)) ;
                  
                  this.sendMessage() ;
                  this.service.formModel.reset() ;
                  this.router.navigate(["student"]) ;
                }
              }
            )
          }
        }
        else{
          this.snackBar.open("Something Wrong", "",{duration: 2000});
        }
      }
    ) ;
  }

  sendMessage(): void {
    this.service2.sendUpdate('loggedIn');
  }
}
