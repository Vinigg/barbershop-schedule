import { RouterModule,Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterAppointmentComponent } from './components/register-appointment/register-appointment.component';
import { UpdateAppointmentComponent } from './components/update-appointment/update-appointment.component';

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
    path:'**',
    redirectTo:'register'
  }
];


