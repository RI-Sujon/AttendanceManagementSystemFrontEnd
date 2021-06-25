import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-view-student-list',
  templateUrl: './view-student-list.component.html',
  styleUrls: ['./view-student-list.component.css']
})
export class ViewStudentListComponent implements OnInit {
  
  public students: Student[] = [] ;

  constructor(private service: StudentService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!='admin'){
      this.router.navigate(["admin-login/loginModule"]);
    }
    this.loadStudents() ;
  }

  loadStudents(){
    this.service.getAllStudents().subscribe(
      response => {
        this.students = response ;
        console.log("succeed" );
      }
    );
  }

  deleteAccount(student:Student){
    var bsseroll = student.bsseroll ;

    this.service.deleteAccount(bsseroll).subscribe(
      (response: any)=>{
        if(response==true)
        {
          console.log("deleted");
          this.loadStudents() ;
        }
    }
    );
  }

  editStudentInfo(student: Student){
    this.service.storeStudentForEditStudentInfo = student ;
    this.router.navigate(["admin/students-management/edit-info/"]) ;
  }
}
