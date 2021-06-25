import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceAndPostService {
  constructor(public http: HttpClient) { }

  public surjiUrl = "http://localhost:5004/surji/course/" ;

  public createNewPost(courseId:string, batchNo:string, postGiverName: string, username: string, bsseroll: number, postType: string, post: string){
    var body = {
      "CourseId": courseId,
      "BatchNo": batchNo,
      "PostGiverName": postGiverName,
      "TeacherUserName": username,
      "StudentRollNo": bsseroll,
      "PostType": postType,
      "Post" : post
    }

    return this.http.post<any>(this.surjiUrl + "post/create", body);
  }

  public getAllPosts(courseId:string, batchNo:string){
    return this.http.get<any>(this.surjiUrl + "post/getAll", {params: { "courseId" : courseId, "batchNo" : batchNo}}) ;
  }

  public deletePost(postId: any){
    return this.http.delete<any>(this.surjiUrl + "post/delete", {params: {"postId": postId }}) ;
  }

  public editPost(id: any ,dateAndTime: Date, courseId:string, batchNo:string, postGiverName: string, username: string, bsseroll: number, postType: string, post: string){
    var body = {
      "Id": id,
      "DateAndTime": dateAndTime,
      "CourseId": courseId,
      "BatchNo": batchNo,
      "PostGiverName": postGiverName,
      "TeacherUserName": username,
      "StudentRollNo": bsseroll,
      "PostType": postType,
      "Post" : post
    }

    return this.http.post<any>(this.surjiUrl + "post/update", body);
  }

  public openAttendancePost(id: any){
    return this.http.get<any>(this.surjiUrl + "post/openAttendance", {params: {"postId": id}}) ;
  }

  public closeAttendancePost(id: any){
    return this.http.get<any>(this.surjiUrl + "post/closeAttendance", {params: {"postId": id}}) ;
  }

  public giveAttendance(courseId:string, batchNo:string, bsseroll: number, dateAndTime: Date){
    var body = {
      "CourseId": courseId,
      "BatchNo": batchNo,
      "BSSEROLL": bsseroll,
      "DateAndTime": dateAndTime
    }

    return this.http.post<any>(this.surjiUrl + "attendance/add", body);
  }

  public getAllAttendance(courseId:string, batchNo:string){
    return this.http.get<any>(this.surjiUrl + "attendance/getAll", {params: { "courseId" : courseId, "batchNo" : batchNo}}) ;
  }

  public getMyAttendance(courseId:string, batchNo:string, bsseRoll:string){
    return this.http.get<any>(this.surjiUrl + "attendance/getAllByRoll", {params: { "courseId" : courseId, "batchNo" : batchNo, "bsseroll": bsseRoll}}) ;
  }

  public deleteAttendance(postId: any){
    return this.http.delete<any>(this.surjiUrl + "attendance/delete", {params: {"postId": postId}}) ;
  }
}


