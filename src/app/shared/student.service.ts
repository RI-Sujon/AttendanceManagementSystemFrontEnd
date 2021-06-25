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

    return this.http.post<any>(this.surjiUrl + "signUp2", body);
  }


  public getAllStudents(){
    return this.http.get<any>(this.surjiUrl + "getAll") ;
  }

  public deleteAccount(bsseroll: any){
    return this.http.post<any>(this.surjiUrl + "delete", bsseroll) ;
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
    var body = {
      "Email": this.formModel.value.Email,
      "password": this.formModel.value.Password,
    }

    return this.http.post<any>(this.surjiUrl + "signIn", body) ;
    // return this.http.post<any>(this.surjiUrl + "signIn", body)
    // .pipe(map(student => {
    //   localStorage.setItem('user', JSON.stringify(student));
    //   this.studentSubject.next(student) ;
    //   return student ;
    // }));
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
