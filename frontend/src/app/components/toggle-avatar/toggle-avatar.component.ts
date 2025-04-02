import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Router } from '@angular/router';

@Component({
    selector: 'toggle-avatar',
    templateUrl: './toggle-avatar.component.html',
    standalone: true,
    imports: [TieredMenu, ButtonModule, AvatarModule]
})
export class ToggleAvatar implements OnInit {
    constructor(private router: Router) {}

    items: MenuItem[] = [];
    isLoggedIn = false;

    ngOnInit() {
        this.checkAuthStatus();
        this.updateMenuItems();
    }

    checkAuthStatus() {
        // Verifica se existe email no sessionStorage
        this.isLoggedIn = !!sessionStorage.getItem('email');

        // Opcional: observar mudanças no storage
        window.addEventListener('storage', () => {
            this.isLoggedIn = !!sessionStorage.getItem('email');
            this.updateMenuItems();
        });
    }

    updateMenuItems() {
        this.items = [
            {
                label: 'Config',
                icon: 'pi pi-cog',
            },
            {
                separator: true
            },
            this.isLoggedIn
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
        sessionStorage.removeItem('email');
        this.isLoggedIn = false;
        this.updateMenuItems();
        this.router.navigate(['/']); // Redireciona para home ou login
    }
}
