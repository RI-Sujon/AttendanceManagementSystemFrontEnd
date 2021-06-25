import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginModuleComponent } from './admin-login/admin-login-module/admin-login-module.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegistrationModuleComponent } from './admin-login/admin-registration-module/admin-registration-module.component';
import { AdminComponent } from './admin/admin.component';
import { AddCourseComponent } from './admin/course-management/add-course/add-course.component';
import { CourseManagementComponent } from './admin/course-management/course-management.component';
import { EditCourseBasicInfoComponent } from './admin/course-management/edit-course-basic-info/edit-course-basic-info.component';
import { ViewCourseListComponent } from './admin/course-management/view-course-list/view-course-list.component';
import { HomepageComponent } from './admin/homepage/homepage.component';
import { AddStudentComponent } from './admin/students-management/add-student/add-student.component';
import { EditStudentInfoComponent } from './admin/students-management/edit-student-info/edit-student-info.component';
import { StudentsManagementComponent } from './admin/students-management/students-management.component';
import { ViewStudentListComponent } from './admin/students-management/view-student-list/view-student-list.component';
import { AddTeacherComponent } from './admin/teachers-management/add-teacher/add-teacher.component';
import { EditTeacherInfoComponent } from './admin/teachers-management/edit-teacher-info/edit-teacher-info.component';
import { TeachersManagementComponent } from './admin/teachers-management/teachers-management.component';
import { ViewTeacherListComponent } from './admin/teachers-management/view-teacher-list/view-teacher-list.component';
import { AttendanceReportComponent } from './course/attendance-report/attendance-report.component';
import { CourseComponent } from './course/course.component';
import { PeopleComponent } from './course/people/people.component';
import { StreamComponent } from './course/stream/stream.component';
import { LoginModuleComponent } from './student-login/login-module/login-module.component';
import { RegistrationComponent } from './student-login/registration/registration.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  //{path: '', redirectTo: '/student/registration', pathMatch: 'full'},
  {path: '', redirectTo: '/welcome-page', pathMatch: 'full'},
  { path: 'welcome-page', component: WelcomePageComponent, },
  { path: 'more' , component: WelcomePageComponent } ,
  {
    path: 'student-login', component: StudentLoginComponent,
    children:[
      { path: 'registration', component: RegistrationComponent},
      { path: 'loginModule', component: LoginModuleComponent}
    ]
  },
  {
    path: 'admin-login', component: AdminLoginComponent,
    children:[
      { path: 'registration', component: AdminRegistrationModuleComponent},
      { path: 'loginModule', component: AdminLoginModuleComponent},
    ]
  },
  {
    path: 'admin', component: AdminComponent,
    children:[
      { path: 'homepage', component: HomepageComponent },
      {
        path: 'students-management', component: StudentsManagementComponent,
        children:[
          { path: 'view-list', component: ViewStudentListComponent },
          { path: 'add-student', component: AddStudentComponent },
          { path: 'edit-info', component: EditStudentInfoComponent },
        ] 
      },
      { path: 'teachers-management', component: TeachersManagementComponent, 
        children:[
          { path: 'view-list', component: ViewTeacherListComponent },
          { path: 'add', component: AddTeacherComponent },
          { path: 'edit-info', component: EditTeacherInfoComponent },
        ] 
      },
      { path: 'course-management', component: CourseManagementComponent,
        children:[
          { path: 'view-list', component: ViewCourseListComponent },
          { path: 'create-new', component: AddCourseComponent },
          { path: 'edit-info', component: EditCourseBasicInfoComponent },
        ] 
      }
    ]
  },
  { path: 'course', component: CourseComponent,
    children:[
      { path: 'stream', component: StreamComponent },
      { path: 'people', component: PeopleComponent},
      { path: 'attendance-report', component: AttendanceReportComponent}
    ]
  },
  { path: 'teacher', component: TeacherComponent,
  },
  { path: 'student', component: StudentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
