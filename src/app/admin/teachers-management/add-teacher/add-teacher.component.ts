import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  constructor(public service: AdminService, public router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!='admin'){
      this.router.navigate(["admin-login/loginModule"]);
    }
  }

  addTeacherAccount(): void{
    this.service.addTeacherAccount().subscribe(
      (response: any)=>{
        if(response=true){
          this.service.addTeacherAccount2().subscribe(
            (response: any)=>{
              if(response=true){
                this.service.formModel.reset() ;
                this.router.navigate(["admin/homepage"]) ;
              }
            }
          );
        }
        else{
          console.log("account creation problem");
        }
      }
    ) ;
  }

}
