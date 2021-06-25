import { Component, OnInit } from '@angular/core';
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

  constructor(private service: AdminService, private router: Router) { }

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
        console.log("succeed" );
      }
    );
  }

  deleteAccount(teacher:Teacher){
    var username = teacher.username ;
    console.log(">>>>>:" + username);
    this.service.deleteAccount(username).subscribe(
      (response: any)=>{
        if(response==true)
        {
          console.log("deleted");
          this.loadTeachers() ;
        }
    }
    );
  }

  editTeacherInfo(teacher: Teacher){
    this.service.storeTeacherForEditTeacherInfo = teacher ;
    this.router.navigate(["admin/teachers-management/edit-info/"]) ;
  }

}
