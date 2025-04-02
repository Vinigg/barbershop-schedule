import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../interfaces/apointment';
import { Observable, of } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'table-striped-demo',
    templateUrl: 'table-striped.component.html',
    standalone: true,
    imports: [TableModule, CommonModule, ButtonModule],
    providers: [AppointmentService]
})
export class TableStripedDemo {
    appointments$!: Observable<Appointment[]>;

    constructor(private appointmentService: AppointmentService) {
      this.appointments$ = this.loadAppointments();
    }

    loadAppointments(): Observable<Appointment[]> {
      return this.appointmentService.getAppointments().pipe(
          catchError(() => of([]))
      );
  }
  loading: {[key: number]: boolean} = {};

    deleteAppointment(id: number) {
      if (confirm('Are you sure you want to delete this appointment?')) {
          this.appointmentService.deleteAppointment(id).pipe(
              switchMap(() => this.appointmentService.getAppointments())
          ).subscribe({
              next: (updatedAppointments) => {
                  this.appointments$ = of(updatedAppointments); // Reatribui o Observable
                  console.log('Deleted successfully');
              },
              error: (err) => console.error('Error deleting', err)
          });
      }
  }
}
