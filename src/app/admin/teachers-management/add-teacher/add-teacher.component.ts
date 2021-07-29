import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  constructor(public service: AdminService, public router: Router, public snackBar: MatSnackBar) { }

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
                this.snackBar.open("Account Created Successfully", "",{duration: 2000});
                this.service.formModel.reset() ;
                this.router.navigate(["admin/homepage"]) ;
              }
            }
          );
        }
        else{
          this.snackBar.open("Something Wrong", "",{duration: 2000});
        }
      }
    ) ;
  }

}
