import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')!=null){
      this.router.navigate(["welcomepage"]);
    }
  }

}
