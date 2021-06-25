import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if(isLoggedIn=='admin'){
      this.router.navigate(["admin/homepage"]) ;
    }
    else if(isLoggedIn=='teacher'){
      if(localStorage.getItem('user')!=null){
        this.router.navigate(["teacher"]) ;
      }
    }
    else if(isLoggedIn=='student'){
      if(localStorage.getItem('user')!=null){
        this.router.navigate(["student"]) ;
      }
    }
  }
}
