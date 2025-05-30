import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { ToastModule } from 'primeng/toast';
import { MenubarTemplateDemo } from "./components/menu-bar/menu-bar.component";


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, MenubarTemplateDemo],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'barbershop-schedule-frontend';
  constructor(private primeng: PrimeNG) {}

    ngOnInit() {
        this.primeng.ripple.set(true);
    }
}
