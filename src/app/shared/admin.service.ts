import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Teacher } from '../model/teacher';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  public adminSubject: BehaviorSubject<Teacher> | any ;
  public admin: Observable<Teacher> | any ;

  constructor(private fb: FormBuilder, private http: HttpClient) 
  { 
    this.adminSubject = new BehaviorSubject<Teacher>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.admin = this.adminSubject.asObservable();
  } 

  public surjiUrl = "http://localhost:5004/surji/admin/" ;

  public adminSignInOperation(){
    var body = {
      "username": this.adminSignInformModel.value.usernameOrEmail,
      "password": this.adminSignInformModel.value.password,
    }

    return this.http.post<any>(this.surjiUrl + "signIn2", body);
  }

  public teacherSignInOperation(){
    var body = {
      "username": this.adminSignInformModel.value.usernameOrEmail,
      "password": this.adminSignInformModel.value.password,
    }

    return this.http.post<any>(this.surjiUrl + "signIn", body);
  }

  public addTeacherAccount(){
    var body = {
      "username": this.formModel.value.username,
      "password": this.formModel.value.Password,
    }

    return this.http.post<any>(this.surjiUrl + "signUp", body);
  }
  public addTeacherAccount2(){
    var body = {
      "TeacherName": this.formModel.value.TeacherName,
      "username": this.formModel.value.username,
      "Post": this.formModel.value.Post,
      "Email": this.formModel.value.Email,
      "MobileNumber": this.formModel.value.MobileNumber,
    }

    return this.http.post<any>(this.surjiUrl + "signUp2", body);
  }

  public getAllTeachers(){
    return this.http.get<any>(this.surjiUrl + "getAll") ;
  }

  public deleteAccount(username: any){
    var body = {
      "username": username,
    } 
    return this.http.post<any>(this.surjiUrl + "delete", body) ;
  }

  public editTeacherInfo(id: any){
    var body = {
      "Id": id,
      "username": this.formModel.value.username,
      "TeacherName": this.formModel.value.TeacherName,
      "Post": this.formModel.value.Post,
      "Email": this.formModel.value.Email,
      "MobileNumber": this.formModel.value.MobileNumber,
    }

    return this.http.post<any>(this.surjiUrl + "update", body);
  }

  adminSignInformModel = this.fb.group({
    usernameOrEmail: ['', Validators.required],
    password: ['', Validators.required],
  });

  formModel = this.fb.group({
    TeacherName: ['', Validators.required],
    username: ['', Validators.required],
    Email : ['', [Validators.email, Validators.required]],
    MobileNumber : ['', Validators.required],
    Password : ['', [Validators.required, Validators.minLength(6)]],
    Post: ['', Validators.required],
  });

  public storeTeacherForEditTeacherInfo: Teacher = new Teacher() ;
}
