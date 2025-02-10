import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { EPlataforms, PLATAFORMS_LABELS } from '../../../models/tournament/enums/plataforms.enum';
import { ETournamentStatus, TOURNAMENT_STATUS_LABELS } from '../../../models/tournament/enums/tournament-status.enum';
import { EGames, GAME_LABELS } from '../../../models/tournament/enums/games.enum';

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
  @Input() game!: EGames;
  @Input() plataform!: EPlataforms;
  @Input() maxTeams!: number;
  @Input() startDate!: string;
  @Input() status!: ETournamentStatus;
  @Input() image!: string;
  @Output() update = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() details = new EventEmitter<void>();
  @Output() signUp = new EventEmitter<void>();

  @Input() isOrganizer: boolean = true;


  get gameLabel(): string {
    return GAME_LABELS[this.game];
  }

  get plataformLabel(): string {
    return PLATAFORMS_LABELS[this.plataform];
  }

  get statusLabel(): string {
    return TOURNAMENT_STATUS_LABELS[this.status];
  }

}
