import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { ToggleAvatar } from '../toggle-avatar/toggle-avatar.component';

@Component({
    selector: 'menu-bar',
    templateUrl: './menu-bar.component.html',
    standalone: true,
    imports: [Menubar, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule,ToggleAvatar]
})
export class MenubarTemplateDemo implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
            },
        ];
    }
}
