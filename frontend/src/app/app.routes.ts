import { RouterModule,Routes } from '@angular/router';
import { RegisterAppointmentComponent } from './components/register-appointment/register-appointment.component';
import { UpdateAppointmentComponent } from './components/update-appointment/update-appointment.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path:'register',
    component: RegisterAppointmentComponent
  },
  {
    path:'update',
    component: UpdateAppointmentComponent
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate:[loginGuard]
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate: [authGuard]
  },
  {
    path:'**',
    redirectTo:'register'
  }
];


