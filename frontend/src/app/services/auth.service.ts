import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../interfaces/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  registerAppointment(appointmentDetails:Appointment){
    return this.http.post(`${this.baseUrl}/appointments`, appointmentDetails);
  }

  getAppointmentByUserEmail(email:string):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments?email=${email}`);
  }

  patchAppointment(appointmentDetails:Appointment){
    return this.http.patch(`${this.baseUrl}/appointments/${appointmentDetails.id}`, appointmentDetails)
  }

  deleteAppointment(appointmentId: Appointment['id']){
    return this.http.delete(`${this.baseUrl}/appointments/${appointmentId}`)
  }
}
