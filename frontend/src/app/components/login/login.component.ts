import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { LoginFormComponent } from "../login-form/login-form.component";
import { DividerModule } from 'primeng/divider';
import { RegisterAdminFormComponent } from "../register-admin-form/register-admin-form.component";

@Component({
  selector: 'app-login',
  imports: [CardModule, LoginFormComponent, DividerModule, RegisterAdminFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
