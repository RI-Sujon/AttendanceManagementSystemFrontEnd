import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient){}

  private subjectName = new Subject<any>(); //need to create a subject
    
  sendUpdate(message: string) { //the component that wants to update something, calls this fn
      this.subjectName.next({ text: message }); //next() will feed the value in Subject
  }

  getUpdate(): Observable<any> { //the receiver component calls this function 
    return this.subjectName.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }

  public surjiUrl = "http://localhost:5004/surji/" ;

  changeAdminPassword(username: string, oldPassword: string, newPassword: string){
    var body = {
      "usernameOrRoll": username,
      "newPassword": newPassword,
      "oldPassword": oldPassword
    }

    return this.http.post<any>(this.surjiUrl + "admin/updatePassword", body) ;
  }

  changeStudentPassword(bsseroll: string, oldPassword: string, newPassword: string){

    var body = {
      "usernameOrRoll": bsseroll,
      "newPassword": newPassword,
      "oldPassword": oldPassword,
    }
    
    return this.http.post<any>(this.surjiUrl + "student/updatePassword", body);
  }
}
