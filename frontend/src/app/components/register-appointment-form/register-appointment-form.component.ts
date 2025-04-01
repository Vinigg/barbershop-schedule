import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Appointment } from '../../interfaces/auth';
import { MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-register-appointment-form',
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule, DatePickerModule, InputMaskModule,NgIf,RouterModule],
  templateUrl: './register-appointment-form.component.html',
  styleUrl: './register-appointment-form.component.css'
})

export class RegisterAppointmentFormComponent {
  registerAppointmentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ){
    this.registerAppointmentForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      name:['',Validators.required],
      phone: ['',Validators.required],
      date:[null],
      dateSelector:['',Validators.required],
      time:['',Validators.required]

    });

    this.registerAppointmentForm.get('dateSelector')?.valueChanges.subscribe((newDate) => {
      this.registerAppointmentForm.get('date')?.setValue(newDate);
    });
  }
  get email() {
    return this.registerAppointmentForm.get('email');
  }
  get name() {
    return this.registerAppointmentForm.get('name');
  }
  get phone() {
    return this.registerAppointmentForm.get('phone');
  }

  submitDetails(){
    const formValue = this.registerAppointmentForm.value;
    const timeDate = new Date(formValue.time);
    delete formValue.dateSelector;

    const postData = {...formValue, time: `${timeDate.getHours().toString().padStart(2, '0')}:${timeDate.getMinutes().toString().padStart(2, '0')}`}

    this.authService.registerAppointment(postData as Appointment).subscribe(
      response => {
        console.log(response)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Appointment successfully registered', life: 3000 });
        this.router.navigate(['update'])
      },
      error => {
        console.log(error)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong', life: 3000 });
      }

    )
  }

}
