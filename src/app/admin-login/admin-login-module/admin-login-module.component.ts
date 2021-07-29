import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/admin.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-admin-login-module',
  templateUrl: './admin-login-module.component.html',
  styleUrls: ['./admin-login-module.component.css']
})
export class AdminLoginModuleComponent implements OnInit {

  constructor(public service: AdminService, public service2: CommonService, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!=null){
      this.router.navigate(["welcome-page"]);
    }
  }

  signIn(): void{
    var usernameOrEmail = this.service.adminSignInformModel.value.usernameOrEmail ;

    if(usernameOrEmail=='admin'){
      this.service.adminSignInOperation().subscribe(
        (response: any)=>{
          if(response != false){
            localStorage.setItem('isLoggedIn', "admin");
            localStorage.setItem('userToken', response.tokenString)
            this.sendMessage() ;
            this.router.navigate(["admin/homepage"]) ;
            this.service.adminSignInformModel.reset() ;
          }
          else{
            this.snackBar.open("Something wrong", "undo",{duration: 2000});
          }
        }
      ) ;
    }
    else{
      this.service.adminSignInOperation().subscribe(
        (response: any)=>{
          if(response!=null){
            if(response==false){
              this.snackBar.open("username && password doesnot match.", "",{duration: 2000});
            }
            else{
              localStorage.setItem('isLoggedIn', "teacher");
              localStorage.setItem('userToken', response.tokenString) ;
            
              this.service.getTeacherBasicInfo().subscribe(
                (response: any)=>{
                  if(response!=null){
                    localStorage.setItem('user', JSON.stringify(response)) ;
                    
                    this.sendMessage() ;
                    this.service.adminSignInformModel.reset() ;
                    this.router.navigate(["teacher"]) ;
                  }
                }
              )
            }
            //this.service.adminSignInformModel.reset() ;
          }
          else{
            this.snackBar.open("Something Wrong", "",{duration: 2000});
          }
        }
      ) ;
    }    
  }

  sendMessage(): void {
    this.service2.sendUpdate('loggedIn');
  }
}
