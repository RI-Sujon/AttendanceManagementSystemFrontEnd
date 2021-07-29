import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelperService) { }

  canActivate(){
    const token = localStorage.getItem("userToken") ;
    
    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true ;
    }
  
    localStorage.removeItem('isLoggedIn') ;
    localStorage.removeItem('user') ;
    localStorage.removeItem('userToken') ;
    this.router.navigate(['welcome-page']) ;
    return false ;
  }
}
