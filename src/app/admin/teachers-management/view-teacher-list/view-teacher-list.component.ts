import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/model/teacher';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-view-teacher-list',
  templateUrl: './view-teacher-list.component.html',
  styleUrls: ['./view-teacher-list.component.css']
})
export class ViewTeacherListComponent implements OnInit {

  public teachers: Teacher[] = [] ;

  constructor(private service: AdminService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!='admin'){
      this.router.navigate(["admin-login/loginModule"]);
    }
    this.loadTeachers() ;
  }

  loadTeachers(){
    this.service.getAllTeachers().subscribe(
      response => {
        this.teachers = response ;
      }
    );
  }

  deleteAccount(teacher:Teacher){
    var username = teacher.username ;

    alert("Delete username: " + username + "  Teacher Name: " + teacher.teacherName );


    this.service.deleteAccount(username).subscribe(
      (response: any)=>{
        if(response==true)
        {
          this.snackBar.open( username + " has been deleted successfully", "",{duration: 2000});
          this.loadTeachers() ;
        }else{
          this.snackBar.open("Something Wrong", "",{duration: 2000});
        }
    }
    );
  }

  editTeacherInfo(teacher: Teacher){
    this.service.storeTeacherForEditTeacherInfo = teacher ;
    this.router.navigate(["admin/teachers-management/edit-info/"]) ;
  }

}
