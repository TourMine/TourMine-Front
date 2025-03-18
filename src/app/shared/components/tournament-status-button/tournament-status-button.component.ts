import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tournament-status-button',
  imports: [
    CommonModule,
    ButtonModule
  ],
  templateUrl: './tournament-status-button.component.html',
  styleUrl: './tournament-status-button.component.scss'
})
export class TournamentStatusButtonComponent {
  @Input() status: number = 0;
}
