import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { CardModule } from 'primeng/card';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Appointment } from '../../interfaces/auth';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-update-appointment',
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule, DatePickerModule, InputMaskModule, CardModule,NgIf,RouterModule,InputIcon, IconField],
  templateUrl: './update-appointment.component.html',
  styleUrl: './update-appointment.component.css'
})
export class UpdateAppointmentComponent {
  updateAppointmentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private msgService: MessageService,
    private utils: UtilsService
  ){
    this.updateAppointmentForm = this.fb.group({
      id: [],
      email:['',[Validators.required, Validators.email]],
      name:['',Validators.required],
      phone: ['',Validators.required],
      date:[null],
      time:['',Validators.required],
      dateSelector:['',Validators.required]
    });

    this.updateAppointmentForm.get('dateSelector')?.valueChanges.subscribe((newDate) => {
      this.updateAppointmentForm.get('date')?.setValue(newDate);
    });
  }
  get email() {
    return this.updateAppointmentForm.get('email');
  }
  get name() {
    return this.updateAppointmentForm.get('name');
  }
  get phone() {
    return this.updateAppointmentForm.get('phone');
  }
  searchAppointment(){
    const {email} = this.updateAppointmentForm.value
    this.authService.getAppointmentByEmail(email as string).subscribe({
      next: (response) => {
        if(!!response)
        {
          const appointment = response;
          this.updateAppointmentForm.patchValue({
            id: appointment.id,
            name: appointment.name,
            phone: appointment.phone,
            date: appointment.date,
            time: appointment.time,
            dateSelector: appointment.date
          });

          this.updateAppointmentForm.get('name')?.markAsTouched();
          this.updateAppointmentForm.get('phone')?.markAsTouched();

        } else{
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Appointment not found', life: 3000 });
        }
      },
      error: (err) => {
        console.log(err)
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong', life: 3000 });

      },
      complete: () => {
      }
    })
  }
  onEmailBlur() {
    if (this.updateAppointmentForm.get('email')?.valid) {
      this.searchAppointment();
    }
  }
  submitUpdate(){
    const formValue = this.updateAppointmentForm.value;
    const timeDate = new Date(formValue.time);
    delete formValue.dateSelector;
    const formattedPhone = this.utils.formatPhoneNumber(formValue.phone);


    const postData = {
      ...formValue,
      phone: formattedPhone,
      time: `${timeDate.getHours().toString().padStart(2, '0')}:${timeDate.getMinutes().toString().padStart(2, '0')}`
    }
    this.authService.patchAppointment(postData as Appointment).subscribe(
      response =>  {this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Appointment successfully updated', life: 3000 });},
      error => {
        console.log(error)
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong', life: 3000 });
      }
    )
  }
  submitDelete(){
    const formValue = this.updateAppointmentForm.value;

    this.authService.deleteAppointment(formValue.id).subscribe(
      response => {this.msgService.add({ severity: 'warn', summary: 'Warning', detail: 'Appointment successfully deleted', life: 5000 });},
      error => {
        console.log(error)
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong', life: 3000 });
      }
    )
  }
}
