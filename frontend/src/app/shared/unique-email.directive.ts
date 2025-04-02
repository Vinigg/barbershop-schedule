import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, timer } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { AppointmentService } from "../services/appointment.service";
import { EmailValidatorService } from "../services/email-validator.service";

export function uniqueEmailValidator(service: EmailValidatorService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(500).pipe( // Espera 500ms após a última digitação
      switchMap(() => service.validateEmailUnique(control.value)),
      map(isUnique => isUnique ? null : { emailNotUnique: true })
    );
  };
}
