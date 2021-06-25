import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './student-login/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { LoginModuleComponent } from './student-login/login-module/login-module.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { AdminLoginModuleComponent } from './admin-login/admin-login-module/admin-login-module.component';
import { AdminRegistrationModuleComponent } from './admin-login/admin-registration-module/admin-registration-module.component';
import { StudentService } from './shared/student.service';
import { AdminService } from './shared/admin.service';
import { HomepageComponent } from './admin/homepage/homepage.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { SidebarModule } from "ng-sidebar";
import { TeachersManagementComponent } from './admin/teachers-management/teachers-management.component';
import { StudentsManagementComponent } from './admin/students-management/students-management.component';
import { CourseManagementComponent } from './admin/course-management/course-management.component';
import { ViewStudentListComponent } from './admin/students-management/view-student-list/view-student-list.component';
import { AddStudentComponent } from './admin/students-management/add-student/add-student.component';
import { EditStudentInfoComponent } from './admin/students-management/edit-student-info/edit-student-info.component';
import { AddTeacherComponent } from './admin/teachers-management/add-teacher/add-teacher.component';
import { EditTeacherInfoComponent } from './admin/teachers-management/edit-teacher-info/edit-teacher-info.component';
import { ViewTeacherListComponent } from './admin/teachers-management/view-teacher-list/view-teacher-list.component';
import { AddCourseComponent } from './admin/course-management/add-course/add-course.component';
import { EditCourseBasicInfoComponent } from './admin/course-management/edit-course-basic-info/edit-course-basic-info.component';
import { ViewCourseListComponent } from './admin/course-management/view-course-list/view-course-list.component';
import { CourseComponent } from './course/course.component';
import { StreamComponent } from './course/stream/stream.component';
import { PeopleComponent } from './course/people/people.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentLoginComponent } from './student-login/student-login.component'
import { StudentComponent } from './student/student.component';
import { AttendanceReportComponent } from './course/attendance-report/attendance-report.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    StudentComponent,
    LoginModuleComponent,
    WelcomePageComponent,
    TopBarComponent,
    BottomBarComponent,
    AdminComponent,
    AdminLoginModuleComponent,
    AdminRegistrationModuleComponent,
    HomepageComponent,
    AdminLoginComponent,
    TeachersManagementComponent,
    StudentsManagementComponent,
    CourseManagementComponent,
    ViewStudentListComponent,
    AddStudentComponent,
    EditStudentInfoComponent,
    AddTeacherComponent,
    EditTeacherInfoComponent,
    ViewTeacherListComponent,
    AddCourseComponent,
    EditCourseBasicInfoComponent,
    ViewCourseListComponent,
    CourseComponent,
    StreamComponent,
    PeopleComponent,
    TeacherComponent,
    StudentLoginComponent,
    AttendanceReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    SidebarModule.forRoot()
  ],
  providers: [StudentService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
