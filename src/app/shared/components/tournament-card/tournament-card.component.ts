import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tournament-card',
  imports: [
    CommonModule,
    MatCardModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './tournament-card.component.html',
  styleUrl: './tournament-card.component.scss'
})
export class TournamentCardComponent {
  @Input() name!: string;
  @Input() game!: string;
  @Input() platform!: string;
  @Input() maxTeams!: number;
  @Input() startDate!: string;
  @Input() status!: number;
  @Input() image!: string;
  @Output() update = new EventEmitter<void>();

  get statusText(): string {
    return this.status === 1 ? 'Aberto' : 'Fechado';
  }
}
