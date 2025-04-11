import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { ToggleAvatar } from '../toggle-avatar/toggle-avatar.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'menu-bar',
    templateUrl: './menu-bar.component.html',
    standalone: true,
    imports: [Menubar, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule,ToggleAvatar]
})
export class MenubarTemplateDemo implements OnInit {
    constructor (private router: Router, private authService: AuthService){ }
    items: MenuItem[] | undefined;
    private authSubscription!: Subscription;


    ngOnInit() {
      this.authService.checkAuthStatus();

      this.authSubscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
        this.updateMenuItems(isLoggedIn);
      });
    }

    ngOnDestroy() {
      if (this.authSubscription) {
        this.authSubscription.unsubscribe();
      }
    }

    updateMenuItems(isLoggedIn: boolean) {
      this.items = [
        isLoggedIn ?
        {
          label: 'Home',
          icon: 'pi pi-home',
          command: () => this.home()
        } :
        {
          label: 'Register',
          icon: 'pi pi-note',
          command: () => this.register()
        }
      ];
    }

    home(){
      this.router.navigate(['/home']);
    }

    register(){
      this.router.navigate(['/register']);
    }
}
