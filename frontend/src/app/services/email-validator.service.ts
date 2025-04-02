import { Observable } from 'rxjs';

export interface EmailValidatorService {
  validateEmailUnique(email: string): Observable<boolean>;
}
