import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../interfaces/apointment';
import { EmailValidatorService } from './email-validator.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService implements EmailValidatorService  {

  private baseUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  registerAppointment(appointmentDetails:Appointment){
    return this.http.post(`${this.baseUrl}/appointments`, appointmentDetails);
  }

  validateEmailUnique(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/appointments/check-email/${email}`);
  }

  getAppointments():Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments`);
  }

  getAppointmentByEmail(email:string):Observable<Appointment>{
    return this.http.get<Appointment>(`${this.baseUrl}/appointments/${email}`);
  }

  patchAppointment(appointmentDetails:Appointment){
    return this.http.patch(`${this.baseUrl}/appointments/${appointmentDetails.id}`, appointmentDetails)
  }

  deleteAppointment(appointmentId: Appointment['id']){
    return this.http.delete(`${this.baseUrl}/appointments/${appointmentId}`)
  }

}
