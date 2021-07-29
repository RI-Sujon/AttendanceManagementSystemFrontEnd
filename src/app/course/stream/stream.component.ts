import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { Attendance } from 'src/app/model/attendance';
import { Course } from 'src/app/model/course';
import { Post } from 'src/app/model/post';
import { Student } from 'src/app/model/student';
import { Teacher } from 'src/app/model/teacher';
import { AttendanceAndPostService } from 'src/app/shared/attendance-and-post.service';
import { CourseService } from 'src/app/shared/course.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
  
  posts:Post[] = [] ;
  attendances:Attendance[] = [] ;
  attendanceTrack:string[] = [] ;

  course: Course = new Course() ;
  
  textAreaPost: string | any ;

  isTeacher = false ;
  isAdmin = false ;
  isStudent = false ;

  user: string | any ;
  userFullName: string | any ;
  userName: string | any ;
  bsseRoll: number | any ;

  teacher: Teacher | any;
  student: Student | any;

  reload: any ;
  
  constructor(public service: CourseService, public service2: AttendanceAndPostService, public router: Router) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("isLoggedIn") ;
  
    if(this.user==null){
      this.router.navigate(["welcome-page"]) ;
    }
    else if(localStorage.getItem("isLoggedIn")=="teacher"){
      this.isTeacher = true ;
      this.teacher = localStorage.getItem("user")
      this.teacher = JSON.parse(this.teacher);
      this.userFullName = this.teacher.teacherName ;
      this.userName = this.teacher.username ;
    }
    else if(localStorage.getItem("isLoggedIn")=="student"){
      this.isStudent = true ;
      this.student = localStorage.getItem("user")
      this.student = JSON.parse(this.student);
      this.userFullName = this.student.studentName ;
      this.bsseRoll = this.student.bsseroll ;
      console.log(this.bsseRoll+":======:"+this.userFullName);
    }
    else if(localStorage.getItem("isLoggedIn")=="admin"){
      this.isAdmin = true ;
    }

    this.course = this.service.storeCourseForEditCourseInfo ;

    if(this.course.courseId==""){
      this.router.navigate(["welcome-page"]) ;
    }

    this.loadPosts();
    this.reload = interval(5000).subscribe(
      (value: any) => {
        console.log("value:" + value);
        
        this.attendanceTrack = [];
        this.loadPosts();
      }
    );

    
  }

  ngOnDestroy(): void{
    this.reload.unsubscribe() ;
  }

  loadPosts(){
    this.service2.getAllPosts(this.course.courseId, this.course.batchNo).subscribe(
      response=>{
        this.posts = response ;
        if(this.isStudent){
          this.service2.getMyAttendance(this.course.courseId, this.course.batchNo, this.bsseRoll).subscribe(
            response=>{
              this.attendances = response ;
              for(var post of this.posts){
                var flag = 0; 
                if(post.postType=="attendance"){
                  for(var att of this.attendances){
                    if(post.dateAndTime==att.dateAndTime){
                      var flag = 1;
                      break ;
                    }
                  }
                  if(flag==0 && post.post=="on"){
                    this.attendanceTrack.push("open") ;
                  }
                  else if(flag==1){
                    this.attendanceTrack.push("done") ;
                  }
                  else{
                    this.attendanceTrack.push("miss") ;
                  }
                  continue ;
                }

                this.attendanceTrack.push("invalid");
              }
            }
          );
        }
      }
    );
  }

  createNewPost(){
    if(this.textAreaPost!=""){
      this.service2.createNewPost(this.course.courseId, this.course.batchNo, this.userFullName, this.userName, this.bsseRoll, "post", this.textAreaPost).subscribe(
        response=>{
          if(response==true){
            this.textAreaPost = "" ;
            this.attendanceTrack = [];
            this.loadPosts();
          }
        }
      );
    }
  }

  createAttendancePost(){
    this.service2.createNewPost(this.course.courseId, this.course.batchNo, this.userFullName, this.userName, this.bsseRoll, "attendance", "on").subscribe(
      response=>{
        if(response==true){
          this.attendanceTrack = [];
          this.loadPosts();
        }
      }
    );
  }

  deletePost(id: number){
    alert("Delete Post");

      this.service2.deletePost(id).subscribe(
        response=>{
          this.loadPosts() ;
        }
      );
  }

  giveAttendance(dateAndTime: Date){
    this.service2.giveAttendance(this.course.courseId, this.course.batchNo, this.bsseRoll, dateAndTime).subscribe(
      response=>{
        this.attendanceTrack = [];
        this.loadPosts();
      }
    );
  }

  startAttendancePost(postId: number){
    if(this.isTeacher){
      this.service2.openAttendancePost(postId).subscribe(
        response=>{
          if(response==true){
            this.attendanceTrack = [];
            this.loadPosts();
          }
        }
      );
    }
  }

  stopAttendancePost(postId: number){
    if(this.isTeacher){
      this.service2.closeAttendancePost(postId).subscribe(
        response=>{
          if(response==true){
            this.attendanceTrack = [];
            this.loadPosts();
          }
        }
      );
    }
  }
}
