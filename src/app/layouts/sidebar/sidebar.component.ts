import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterModule, 
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  // Controle do colapso da sidebar
  isCollapsed = false;

  @Input() isLeftSidebarCollapsed: boolean = false;  // Recebe o estado do componente pai
  @Output() changeIsLeftSidebarCollapsed = new EventEmitter<boolean>();  // Emite mudanças para o componente pai

  items = [
    {
      routeLink: 'tournaments',
      icon: 'fa-solid fa-gamepad',
      label: 'Dashboard',
    },
    {
      routeLink: 'tournaments/create',
      icon: 'fa-solid fa-trophy',
      icon_add: 'fa-solid fa-plus',
      label: 'Criar Torneio',
    },
    {
      routeLink: 'tournaments/list',
      icon: 'fa-solid fa-trophy',
      label: 'Torneios',
    },
    {
      routeLink: 'my-subscriptions',
      icon: 'fa-solid fa-list-ul',
      label: 'Minhas Inscrições',
    },
  ];

  // Alterna o estado de colapso da sidebar
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;  // Alterna entre true/false
    this.changeIsLeftSidebarCollapsed.emit(this.isCollapsed);  // Emite o novo estado
  }

  closeSidenav(): void {
    this.isCollapsed = true;
    this.changeIsLeftSidebarCollapsed.emit(true);  // Emite o estado fechado
  }
}
