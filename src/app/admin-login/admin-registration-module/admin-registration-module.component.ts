import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-admin-registration-module',
  templateUrl: './admin-registration-module.component.html',
  styleUrls: ['./admin-registration-module.component.css']
})
export class AdminRegistrationModuleComponent implements OnInit {

  constructor(service: AdminService) { }

  ngOnInit(): void {
  }

}
