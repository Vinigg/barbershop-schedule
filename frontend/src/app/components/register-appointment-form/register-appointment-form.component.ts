import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../interfaces/apointment';
import { uniqueEmailValidator } from '../../shared/unique-email.directive';


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
    private appointmentService: AppointmentService,
    private messageService: MessageService,
    private utils: UtilsService
  ){
    this.registerAppointmentForm = this.fb.group({
      email:['',
        [Validators.required, Validators.email],
        [uniqueEmailValidator(this.appointmentService)]
      ],
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
    const formattedPhone = this.utils.formatPhoneNumber(formValue.phone);

    const postData = {
      ...formValue,
      phone: formattedPhone,
      time: `${timeDate.getHours().toString().padStart(2, '0')}:${timeDate.getMinutes().toString().padStart(2, '0')}`
    }

    this.appointmentService.registerAppointment(postData as Appointment).subscribe(
      response => {
        console.log(response)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Appointment successfully registered', life: 3000 });
      },
      error => {
        console.log(error)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong', life: 3000 });
      }

    )
  }

}
