import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    Menu,
    ButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Opções',
                items: [
                    {
                        label: 'Perfil',
                        icon: 'pi pi-user',
                        command: () => this.router.navigate(['/profile'])
                    },
                    {
                        label: 'Sair',
                        icon: 'pi pi-sign-out',
                        command: () => this.logout() // TODO: logout
                    }
                ]
            }
        ];
    }

    logout() {
    }
}
