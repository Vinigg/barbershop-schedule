import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RegisterAppointmentFormComponent } from "../register-appointment-form/register-appointment-form.component";

@Component({
  standalone: true,
  selector: 'app-register-appointment',
  imports: [CardModule, RegisterAppointmentFormComponent],
  templateUrl: './register-appointment.component.html',
  styleUrl: './register-appointment.component.css'
})
export class RegisterAppointmentComponent {

}
