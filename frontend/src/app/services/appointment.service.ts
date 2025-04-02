import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../interfaces/apointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  registerAppointment(appointmentDetails:Appointment){
    return this.http.post(`${this.baseUrl}/appointments`, appointmentDetails);
  }

  getAppointments():Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments/`);
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
