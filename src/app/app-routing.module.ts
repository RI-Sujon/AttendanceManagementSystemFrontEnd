import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginModuleComponent } from './admin-login/admin-login-module/admin-login-module.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
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
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { LoginModuleComponent } from './student-login/login-module/login-module.component';
import { RegistrationComponent } from './student-login/registration/registration.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome-page', pathMatch: 'full'},
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
      { path: 'loginModule', component: AdminLoginModuleComponent},
    ]
  },
  {
    path: 'admin', component: AdminComponent,
    children:[
      { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuardService] },
      {
        path: 'students-management', component: StudentsManagementComponent, canActivate: [AuthGuardService],
        children:[
          { path: 'view-list', component: ViewStudentListComponent , canActivate: [AuthGuardService]},
          { path: 'add-student', component: AddStudentComponent , canActivate: [AuthGuardService]},
          { path: 'edit-info', component: EditStudentInfoComponent , canActivate: [AuthGuardService]},
        ] 
      },
      { path: 'teachers-management', component: TeachersManagementComponent, canActivate: [AuthGuardService], 
        children:[
          { path: 'view-list', component: ViewTeacherListComponent , canActivate: [AuthGuardService]},
          { path: 'add', component: AddTeacherComponent , canActivate: [AuthGuardService]},
          { path: 'edit-info', component: EditTeacherInfoComponent , canActivate: [AuthGuardService]},
        ] 
      },
      { path: 'course-management', component: CourseManagementComponent, canActivate: [AuthGuardService],
        children:[
          { path: 'view-list', component: ViewCourseListComponent, canActivate: [AuthGuardService] },
          { path: 'create-new', component: AddCourseComponent, canActivate: [AuthGuardService] },
          { path: 'edit-info', component: EditCourseBasicInfoComponent, canActivate: [AuthGuardService] },
        ] 
      }
    ]
  },
  { path: 'course', component: CourseComponent, canActivate: [AuthGuardService],
    children:[
      { path: 'stream', component: StreamComponent, canActivate: [AuthGuardService] },
      { path: 'people', component: PeopleComponent, canActivate: [AuthGuardService]},
      { path: 'attendance-report', component: AttendanceReportComponent, canActivate: [AuthGuardService]}
    ]
  },
  { path: 'teacher', component: TeacherComponent, canActivate: [AuthGuardService]},
  { path: 'student', component: StudentComponent, canActivate: [AuthGuardService]},
  { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
