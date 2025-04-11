import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'toggle-avatar',
    templateUrl: './toggle-avatar.component.html',
    standalone: true,
    imports: [TieredMenu, ButtonModule, AvatarModule]
})
export class ToggleAvatar implements OnInit {
    constructor(private router: Router,private authService: AuthService) {}

    items: MenuItem[] = [];
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
            {
                label: 'Config',
                icon: 'pi pi-cog',
            },
            {
                separator: true
            },
            isLoggedIn
                ? {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: () => this.logout()
                }
                : {
                    label: 'Login',
                    icon: 'pi pi-sign-in',
                    command: () => this.login()
                }
        ];
    }

    login() {
      this.router.navigate(['/login']);
    }

    logout() {
      this.authService.logout();
      this.router.navigate(['/']); // Redireciona para home ou login
    }
}
