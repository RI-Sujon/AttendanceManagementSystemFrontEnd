import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { CourseStudent } from '../model/course_student';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private fb: FormBuilder, private http: HttpClient) { } 

  public surjiUrl = "http://localhost:5004/surji/course/" ;

  public createNewCourse(){
    var body = {
      "CourseId": this.formModel.value.CourseId,
      "CourseName": this.formModel.value.CourseName,
      "BatchNo": this.formModel.value.BatchNo,
      "Teacher1Name": this.formModel.value.Teacher1Name,
      "Teacher1UserName": this.formModel.value.Teacher1UserName,
      "Teacher2Name": this.formModel.value.Teacher2Name,
      "Teacher2UserName": this.formModel.value.Teacher2UserName,
    }

    return this.http.post<any>(this.surjiUrl + "createCourse", body);
  }

  public getAllCourses(){
    return this.http.get<any>(this.surjiUrl + "getAllCourse") ;
  }

  public deleteCourse(courseId: any, batchNo: any){
    var body = {
      "CourseId": courseId,
      "BatchNo": batchNo
    } 
    return this.http.post<any>(this.surjiUrl + "deleteCourse", body) ;
  }

  public editCourseBasicInfo(id: any){
    var body = {
      "Id": id,
      "CourseId": this.formModel.value.CourseId,
      "CourseName": this.formModel.value.CourseName,
      "BatchNo": this.formModel.value.BatchNo,
      "Teacher1UserName": this.formModel.value.Teacher1UserName,
      "Teacher2UserName": this.formModel.value.Teacher2UserName,
    }

    return this.http.post<any>(this.surjiUrl + "updateCourseBasicInfo", body);
  }

  public addStudentToCourse(courseId: string, batchNo: string){
    var body = {
      "CourseId": courseId,
      "BatchNo": batchNo,
      "StudentBSSERoll": this.formModel.value.StudentBSSERoll,
    }

    return this.http.post<any>(this.surjiUrl + "addStudentToCourse", body);
  }

  public getAllStudentOfCourse(courseId: string, batchNo: string): Observable<CourseStudent[]>{
    var body = {
      "CourseId": courseId,
      "BatchNo": batchNo,
    }
    return this.http.post<any>(this.surjiUrl + "getAllStudentOfCourse", body);
  }

  public deleteStudentFromCourse(courseId: string, batchNo: string, bsseRoll: string){
    var body = {
      "CourseId": courseId,
      "BatchNo": batchNo,
      "StudentBSSERoll": bsseRoll
    }

    return this.http.post<any>(this.surjiUrl + "deleteStudentFromCourse", body);
  }

  getAllCourseByTeacherUserName(username: string){
    return this.http.get<any>(this.surjiUrl + "getAllCourseByTeacherUserName", {params: {username: username}}) ;
  }

  getAllCourseByStudentRoll(bsseroll : any){
    return this.http.get<any>(this.surjiUrl + "getAllCourseByStudentRoll", {params: {bsseroll: bsseroll}});
  }

  formModel = this.fb.group({
    CourseId: ['', Validators.required],
    CourseName: ['', Validators.required],
    BatchNo : ['', [Validators.email, Validators.required]],
    Teacher1UserName: ['', Validators.required],
    Teacher2UserName: ['', Validators.required],

    StudentBSSERoll: ['', Validators.required],
  });

  public storeCourseForEditCourseInfo: Course = new Course() ;
}
