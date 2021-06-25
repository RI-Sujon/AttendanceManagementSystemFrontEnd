import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from '../model/student';
import { Teacher } from '../model/teacher';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  messageReceived: any;
  private subscriptionName: Subscription | any; 

  loggedIn = false ;
  notLoggedIn = true ;
  userName: string | any ;
  teacher: Teacher | any ;
  student: Student | any ;
  
  constructor(public router: Router, public service: CommonService) { 
    this.subscriptionName= this.service.getUpdate().subscribe
             (message => {
                this.messageReceived = message;
                console.log("ssssssssssssss===");
                this.ngOnInit() ;
             });
  }

  ngOnInit(): void {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if(isLoggedIn=='admin'){
      this.loggedIn = true ;
      this.notLoggedIn = false;
      this.userName = "Admin" ;
    }
    else if(isLoggedIn=='teacher'){
      if(localStorage.getItem('user')!=null){
        this.loggedIn = true ;
        this.notLoggedIn = false ;
        
        this.teacher = localStorage.getItem('user') ;
        this.teacher = JSON.parse(this.teacher);
        this.userName = this.teacher.teacherName ;

      }
    }
    else if(isLoggedIn=='student'){
      if(localStorage.getItem('user')!=null){
        this.loggedIn = true ;
        this.notLoggedIn = false ;

        this.student = localStorage.getItem('user') ;
        this.student = JSON.parse(this.student);
        this.userName = this.student.studentName ;
        
      }
    }
  }

  sign_out(){
    localStorage.removeItem('isLoggedIn') ;
    localStorage.removeItem('user') ;
    this.loggedIn = false ;
    this.notLoggedIn = true ;
    this.router.navigate(['welcome-page']) ;
    
  }

  ngOnDestroy() { 
    this.subscriptionName.unsubscribe();
  }
}
