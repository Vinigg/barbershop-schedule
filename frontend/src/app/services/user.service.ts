import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000'


  constructor(private http: HttpClient) { }

  registerUser(userDetails:User){
    return this.http.post(`${this.baseUrl}/users`, userDetails);
  }

  getUserByEmail(email:string):Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  patchUser(userDetails:User){
    return this.http.patch(`${this.baseUrl}/users/${userDetails.id}`, userDetails)
  }

  deleteUser(userId:User['id']){
    return this.http.delete(`${this.baseUrl}/users/${userId}`)
  }
}
