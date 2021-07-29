import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(public service: StudentService, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!='admin'){
      this.router.navigate(["admin-login/loginModule"]);
    }
  }

  addStudentAccount(): void{
    this.service.addStudentAccount().subscribe(
      (response: any)=>{
        if(response==true){
          this.service.addStudentAccount2().subscribe(
            (response: any)=>{
              if(response=true){
                this.snackBar.open("Student Added", "",{duration: 2000});
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
