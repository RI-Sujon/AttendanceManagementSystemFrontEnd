import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: StudentService) { }

  ngOnInit(): void {
  }
  

  // signUp(): void{
  //   console.log("===============>>>");
  //   this.service.signUpOperation().subscribe(
  //     (response: any)=>{
  //       if(response.succeded){
  //         console.log("aaaaaaaaaaaaaa");
  //         this.service.formModel.reset() ;
  //       }
  //       else{
  //         console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
  //       }
  //     }
  //   ) ;
  // }
}
