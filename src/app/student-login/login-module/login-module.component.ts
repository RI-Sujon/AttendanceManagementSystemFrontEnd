import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-login-module',
  templateUrl: './login-module.component.html',
  styleUrls: ['./login-module.component.css']
})
export class LoginModuleComponent implements OnInit {

  constructor(public service: StudentService, public service2: CommonService, public router: Router) { }

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
            console.log("username && password doesnot match.");
          }
          else{
            localStorage.setItem('user', JSON.stringify(response));
            localStorage.setItem('isLoggedIn', "student");
            this.service.formModel.reset() ;
            this.sendMessage() ;
            this.router.navigate(["student"]) ;
          }
        }
        else{
          console.log("nnnnnnnn");
        }

      }
    ) ;
  }

  sendMessage(): void {
    this.service2.sendUpdate('loggedIn');
  }

}
