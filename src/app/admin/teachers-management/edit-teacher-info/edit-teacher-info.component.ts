import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/model/teacher';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-edit-teacher-info',
  templateUrl: './edit-teacher-info.component.html',
  styleUrls: ['./edit-teacher-info.component.css']
})
export class EditTeacherInfoComponent implements OnInit {

  teacher: Teacher = new Teacher() ;
  
  constructor(public service: AdminService, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!='admin'){
      this.router.navigate(["admin-login/loginModule"]);
    }
    this.teacher = this.service.storeTeacherForEditTeacherInfo ;
    if(this.teacher.username == ""){
      this.router.navigate(["admin/homepage"]);
    }
  }

  editTeacherInfo(): void{
    this.service.editTeacherInfo(this.teacher.id).subscribe(
      (response: any)=>{
        if(response=true){
          this.snackBar.open("Data Edited Succefully", "",{duration: 2000});
          this.service.formModel.reset() ;
          this.router.navigate(["admin/teachers-management/view-list"]) ;
        }
        else{
          this.snackBar.open("Something Wrong", "",{duration: 2000});
        }
      }
    ) ;
  }

}
