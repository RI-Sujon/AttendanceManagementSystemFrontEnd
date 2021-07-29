import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Student } from '../model/student';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  private studentSubject: BehaviorSubject<Student> | any;
  public student: Observable<Student> | any ;

  public surjiUrl = "http://localhost:5004/surji/student/" ;

  constructor(private formbuilder:FormBuilder, private http: HttpClient) 
  {
    this.studentSubject = new BehaviorSubject<Student>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.student = this.studentSubject.asObservable();
  }

  
  public addStudentAccount(){
    var body = {
      "BSSEROLL": this.formModel.value.BSSEROLL,
      "password": this.formModel.value.Password,
      "Email": this.formModel.value.Email,
    }

    return this.http.post<any>(this.surjiUrl + "signUp", body);
  }
  public addStudentAccount2(){
    var body = {
      "BSSEROLL": this.formModel.value.BSSEROLL,
      "HallName": this.formModel.value.HallName,
      "BatchNo": this.formModel.value.BatchNo,
      "StudentName": this.formModel.value.StudentName,
      "Session": this.formModel.value.Session,
      "Email": this.formModel.value.Email,
      "MobileNumber": this.formModel.value.MobileNumber,
    }

    return this.http.post<any>(this.surjiUrl + "addStudentBasicInfo", body);
  }


  public getAllStudents(){
    return this.http.get<any>(this.surjiUrl + "getAll") ;
  }

  public deleteAccount(bsseroll: any, email: any){
    var body = {
      "BSSEROLL": bsseroll,
      "Email": email,
    }
    return this.http.post<any>(this.surjiUrl + "delete", body) ;
  }

  public editStudentInfo(id: any){
    var body = {
      "Id": id,
      "BSSEROLL": this.formModel.value.BSSEROLL,
      "StudentName": this.formModel.value.StudentName,
      "Session": this.formModel.value.Session,
      "Email": this.formModel.value.Email,
      "MobileNumber": this.formModel.value.MobileNumber,
      "HallName": this.formModel.value.HallName,
      "BatchNo": this.formModel.value.BatchNo,
    }

    return this.http.post<any>(this.surjiUrl + "update", body);
  }

  public studentSignInOperation(){
    var emailOrRoll = this.formModel.value.Email ;
    var body ;
    if(emailOrRoll.length <= 4){
      body = {
        "BSSEROLL": this.formModel.value.Email,
        "password": this.formModel.value.Password,
      }
    }else{
      body = {
        "Email": this.formModel.value.Email,
        "password": this.formModel.value.Password,
      }
    }

    return this.http.post<any>(this.surjiUrl + "signIn", body) ;
  }

  public getStudentBasicInfo(){
    var emailOrRoll = this.formModel.value.Email ;
    var body ;
    if(emailOrRoll.length <= 4){
      body = {
        "BSSEROLL": this.formModel.value.Email,
      }
    }else{
      body = {
        "Email": this.formModel.value.Email,
      }
    }

    return this.http.post<any>(this.surjiUrl + "getStudentInfo", body) ;
  }

  formModel = this.formbuilder.group({
    StudentName: ['', Validators.required],
    BSSEROLL: ['', Validators.required],
    Email : ['', [Validators.email, Validators.required]],
    MobileNumber : ['', Validators.required],
    Session : ['', Validators.required],
    Password : ['', [Validators.required, Validators.minLength(6)]],
    HallName: ['', Validators.required],
    BatchNo: ['', Validators.required]
  });

  // comparePasswords(formbuilder: FormGroup){
  //   let confirmPasswordControl = formbuilder.get('ConfirmPassword') ;
  //   if(confirmPasswordControl?.errors==null || "passwordMismatch" in confirmPasswordControl.errors){
  //     if(formbuilder.get('Password')?.value != confirmPasswordControl?.value){
  //       confirmPasswordControl?.setErrors({ passwordMismatch: true });
  //     }
  //     else{
  //       confirmPasswordControl?.setErrors(null);
  //     }
  //   }
  // }


  public storeStudentForEditStudentInfo: Student = new Student() ;



}
