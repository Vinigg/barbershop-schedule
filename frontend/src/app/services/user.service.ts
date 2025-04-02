import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { EmailValidatorService } from './email-validator.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements EmailValidatorService {
  private baseUrl = 'http://localhost:8080'


  constructor(private http: HttpClient) { }

  validateEmailUnique(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/users/check-email/${email}`);
  }

  registerUser(userDetails:User){
    return this.http.post(`${this.baseUrl}/users`, userDetails);
  }

  getUserByEmail(email:string):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/users/${email}`);
  }

  patchUser(userDetails:User){
    return this.http.patch(`${this.baseUrl}/users/${userDetails.id}`, userDetails)
  }

  deleteUser(userId:User['id']){
    return this.http.delete(`${this.baseUrl}/users/${userId}`)
  }
}
