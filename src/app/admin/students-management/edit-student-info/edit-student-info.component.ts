import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-edit-student-info',
  templateUrl: './edit-student-info.component.html',
  styleUrls: ['./edit-student-info.component.css']
})
export class EditStudentInfoComponent implements OnInit {

  student: Student = new Student ;
  
  constructor(public service: StudentService, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!='admin'){
      this.router.navigate(["admin-login/loginModule"]);
    }
    this.student = this.service.storeStudentForEditStudentInfo ;
    if(this.student.bsseroll==0){
      this.router.navigate(["admin/homepage"]);
    }
    console.log("test:" + this.student.bsseroll);
  }

  editStudentInfo(): void{
    this.service.editStudentInfo(this.student.id).subscribe(
      (response: any)=>{
        if(response=true){
          this.snackBar.open("Student Info Edited", "",{duration: 2000});
          this.service.formModel.reset() ;
          this.router.navigate(["admin/students-management/view-list"]) ;
        }
        else{
          this.snackBar.open("Something Wrong", "",{duration: 2000});

        }
      }
    ) ;
  }

}
