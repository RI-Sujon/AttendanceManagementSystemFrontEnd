import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Attendance } from 'src/app/model/attendance';
import { Course } from 'src/app/model/course';
import { CourseStudent } from 'src/app/model/course_student';
import { Student } from 'src/app/model/student';
import { AttendanceAndPostService } from 'src/app/shared/attendance-and-post.service';
import { CourseService } from 'src/app/shared/course.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent implements OnInit {

  selected = "All" ;
  selectedDate = "" ;
  selectedMonth = "" ;

  public attendances: Attendance [] = [] ;
  public studentsOfCourse: CourseStudent [] = [] ;
  public attendanceMapWithBSSEROLL_list: AttendanceMapWithBSSEROLL[] = [] ;

  totalAttendancePostCounter: number = 0;
  allDateAndTime: Date [] = [] ;
  allMonth: Date [] = [] ;
  
  user: string | any ;
  student: Student | any;
  course: Course | any ;

  isTeacher = false ;
  isAdmin = false ;
  isStudent = false ;

  isFullReport = true ;
  isDailyReport = false ;
  isMonthlyReport = false ;
  isLastCoupleOfDays = false ;

  toppings = new FormControl();

  constructor(public router: Router, public service: CourseService, public service2: AttendanceAndPostService, public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("isLoggedIn") ;
  
    if(this.user==null){
      this.router.navigate(["welcome-page"]) ;
    }
    else if(localStorage.getItem("isLoggedIn")=="teacher"){
      this.isTeacher = true ;
    }
    else if(localStorage.getItem("isLoggedIn")=="student"){
      this.isStudent = true ;
      this.student = localStorage.getItem("user")
      this.student = JSON.parse(this.student);
    }
    else if(localStorage.getItem("isLoggedIn")=="admin"){
      this.isAdmin = true ;
    }

    this.course = this.service.storeCourseForEditCourseInfo ;

    if(this.course.courseId==""){
      this.router.navigate(["welcome-page"]) ;
    }

    this.loadAllAttendanceOfCourse();  
    
  }

  loadAllAttendanceOfCourse(){
    this.service.getAllStudentOfCourse(this.course.courseId, this.course.batchNo).subscribe(
      response => {
        this.studentsOfCourse = response ;
        this.service2.getAllAttendance(this.course.courseId, this.course.batchNo).subscribe(
          response=>{
            this.attendances = response ;
            this.xyz();

            if(this.fullReport){
              this.totalAttendancePostCounter = this.attendances.length ;
              this.fullReport();
            }

          }
        );
      }
    );
  }

  clearAttMap(){
    for(var attMap of this.attendanceMapWithBSSEROLL_list){
      attMap.attendanceCount = 0 ;
      attMap.percentage = "0" ;
      attMap.status = "" ;
    }
  }

  choiceReportOption(obj: any){
    if(obj.value=="Daily"){
      this.isDailyReport = true ;
      this.isFullReport = false ;
      this.isMonthlyReport = false ;
      this.isLastCoupleOfDays = false ;
      this.selectedDate = this.allDateAndTime[0]  + "";
      this.dailyReport(null, this.allDateAndTime[0]);
    }
    else if(obj.value=="Monthly"){
      this.isDailyReport = false ;
      this.isFullReport = false ;
      this.isMonthlyReport = true ;
      this.isLastCoupleOfDays = false ;
      this.selectedMonth = this.allMonth[0] + "";
      this.monthlyReport(null, this.allMonth[0]);
    }
    else if(obj.value=="Last 7 Days"){
      this.isDailyReport = false ;
      this.isFullReport = false ;
      this.isMonthlyReport = false ;
      this.isLastCoupleOfDays = true ;
  
      this.lastCoupleOfDaysReport(7);
    }
    else if(obj.value=="Last 30 Days"){
      this.isDailyReport = false ;
      this.isFullReport = false ;
      this.isMonthlyReport = false ;
      this.isLastCoupleOfDays = true ;
      this.selectedMonth = this.allMonth[0] + "";
      
      this.lastCoupleOfDaysReport(30);
    }
    else{
      this.selected = "All" ;
      this.isDailyReport = false ;
      this.isFullReport = true ;
      this.isMonthlyReport = false ;
      this.isLastCoupleOfDays = false ;
      this.fullReport() ;
    }
  }

  date: Date = new Date() ;
  xyz(){
    for(var att of this.attendances){
      var flag = 0;
      for(var dateAndTime of this.allDateAndTime){
        if(att.dateAndTime==dateAndTime){
          flag = 1 ;
          break ;
        }
      }
      if(flag==0){
        this.allDateAndTime.push(att.dateAndTime) ;
      }

      flag = 0 ;
      for(var dateAndTime of this.allMonth){

        var a = this.datePipe.transform(att.dateAndTime, "MM-yyyy") ;
        var b = this.datePipe.transform(dateAndTime, "MM-yyyy") ;
        
        if(a==b){
          flag = 1 ;
          break ;
        }
      }
      if(flag==0){
        this.allMonth.push(att.dateAndTime) ;
      }
    }

    for(var std of this.studentsOfCourse){
      var temp = new AttendanceMapWithBSSEROLL() ;
      temp.bsseRoll = std.studentBSSERoll ;
      temp.studentName = std.studentName ;
      this.attendanceMapWithBSSEROLL_list.push(temp) ;
    }
  }

  dailyReport(ob: any, dateAndTime2: Date|any){
    if(ob!=null){
      var dateAndTime = ob.value ;
    }
    else if(ob==null){
      var dateAndTime = dateAndTime2 ;
    }

    this.clearAttMap();
    
    for(var attMap of this.attendanceMapWithBSSEROLL_list){
      var count = 0 ;
      for(var att of this.attendances){
        if(att.dateAndTime==dateAndTime){
          if(att.bsseroll==attMap.bsseRoll){
            count++ ;
            break ;
          }
        }
      }

      if(count==1){
        attMap.status = "present" ;
        attMap.attendanceCount = count ;
      }
      else{
        attMap.status = "absent" ;
      }
    }
  }

  fullReport(){
    this.clearAttMap();

    this.totalAttendancePostCounter = this.allDateAndTime.length ;
    for(var attMap of this.attendanceMapWithBSSEROLL_list){
      var count = 0 ;
      for(var att of this.attendances){
        if(att.bsseroll==attMap.bsseRoll){
          count++ ;
        }
      }
      attMap.attendanceCount = count ;
      attMap.percentage = parseFloat(count*100/this.totalAttendancePostCounter + "").toFixed(2)
      attMap.percentage = attMap.percentage + "%" ;
    }
  }

  monthlyReport(ob: any, dateAndTime2: Date | any){
    if(ob!=null){
      var dateAndTime = ob.value ;
    }
    else if(ob==null){
      var dateAndTime = dateAndTime2 ;
    }

    this.clearAttMap();
    
    var totalClassInMonth = 0 ;
    for(var attMap of this.attendanceMapWithBSSEROLL_list){
      var count = 0 ;
      for(var att of this.attendances){
        var a = this.datePipe.transform(att.dateAndTime, "MM-yyyy") ;
        var b = this.datePipe.transform(dateAndTime, "MM-yyyy") ;
        if(a==b){
          if(att.bsseroll==attMap.bsseRoll){
            count++ ;
          }
        }
      }

      attMap.attendanceCount = count ;
    }

    for(var date of this.allDateAndTime){
      var a = this.datePipe.transform(date, "MM-yyyy") ;
      var b = this.datePipe.transform(dateAndTime, "MM-yyyy") ;
      if(a==b){
        totalClassInMonth++ ;
      }
    }

    for(var attMap of this.attendanceMapWithBSSEROLL_list){
      attMap.percentage = parseFloat(attMap.attendanceCount*100/totalClassInMonth + "").toFixed(2)
      attMap.percentage = attMap.percentage + "%" ;
    }

    this.totalAttendancePostCounter = totalClassInMonth ;
  }

  lastCoupleOfDaysReport(days: number){
    this.clearAttMap();
    
    var totalClass = 0 ;
    for(var attMap of this.attendanceMapWithBSSEROLL_list){
      var count = 0 ;
      for(var att of this.attendances){
        var a = this.datePipe.transform(att.dateAndTime, "MM-yyyy") ;
        let difference = Math.abs(new Date().getTime() - new Date(att.dateAndTime).getTime());
        console.log(difference/1000/60/60+":=============================>>>>>>>"+difference);
        
        if(difference/1000/60/60 <= days*24){
          if(att.bsseroll==attMap.bsseRoll){
            count++ ;
          }
        }
      }

      attMap.attendanceCount = count ;
    }

    for(var date of this.allDateAndTime){
      var a = this.datePipe.transform(date, "MM-yyyy") ;
      let difference = Math.abs(new Date().getTime() - new Date(date).getTime());
        console.log(difference/1000/60/60+":=================ff============>>>>>>>"+difference);
      if(difference/1000/60/60 <= days*24){
        totalClass++ ;
      }
    }

    for(var attMap of this.attendanceMapWithBSSEROLL_list){
      attMap.percentage = parseFloat(attMap.attendanceCount*100/totalClass + "").toFixed(2)
      attMap.percentage = attMap.percentage + "%" ;
    }

    this.totalAttendancePostCounter = totalClass ;
  }
}

class AttendanceMapWithBSSEROLL{
  bsseRoll: number | any ;
  status: string | any ;
  attendanceCount: number = 0 ;
  percentage : string = "0%" ;
  studentName: string | any ;

  AttendanceMapWithBSSEROLL(bsseRoll:number, status: string, attendanceCount: number, percentage: string){
    this.bsseRoll = bsseRoll ;
    this.status = status ;
    this.attendanceCount = attendanceCount ;
    this.percentage = percentage ;
  }
}
