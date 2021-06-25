import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!=null){
      this.router.navigate(["welcome-page"]);
    }
  }

}
