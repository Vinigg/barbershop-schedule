import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  checkAuthStatus(): void {
    const isLoggedIn = !!sessionStorage.getItem('email');
    this.isLoggedInSubject.next(isLoggedIn);
  }

  login(email: string): void {
    sessionStorage.setItem('email', email);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    sessionStorage.removeItem('email');
    this.isLoggedInSubject.next(false);
  }
}
