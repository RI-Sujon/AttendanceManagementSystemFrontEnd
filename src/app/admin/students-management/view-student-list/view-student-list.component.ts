import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private service: StudentService, private router: Router, private snackBar: MatSnackBar) { }

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
      }
    );
  }
  deleteAccount(student:Student){
    var bsseroll = student.bsseroll ;
    var email = student.email ;

    console.log("ttttttttttt");
    
    alert("Delete bsseroll: " + bsseroll + "  Student Name: " + student.studentName );

    this.service.deleteAccount(bsseroll, email).subscribe(
      (response: any)=>{
        if(response==true)
        {
          this.snackBar.open(bsseroll + " has been deleted successfully", "",{duration: 2000});
          this.loadStudents() ;
        }
        else{
          this.snackBar.open("Something Wrong", "",{duration: 2000});
        }
    }
    );
  }

  editStudentInfo(student: Student){
    this.service.storeStudentForEditStudentInfo = student ;
    this.router.navigate(["admin/students-management/edit-info/"]) ;
  }
}
