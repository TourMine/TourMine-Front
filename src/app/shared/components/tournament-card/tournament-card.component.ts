import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { EPlataforms, PLATAFORMS_LABELS } from '../../../models/tournament/enums/plataforms.enum';
import { ETournamentStatus, TOURNAMENT_STATUS_LABELS } from '../../../models/tournament/enums/tournament-status.enum';
import { EGames, GAME_LABELS } from '../../../models/tournament/enums/games.enum';

@Component({
  selector: 'app-tournament-card',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './tournament-card.component.html',
  styleUrl: './tournament-card.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class TournamentCardComponent {
  @Input() userId!: string;
  @Input() tournamentId!: string;
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
  @Output() subscription = new EventEmitter<{ tournamentId: string; userId: string }>();

  @Input() isOrganizer: boolean = false;


  get gameLabel(): string {
    return GAME_LABELS[this.game];
  }

  get plataformLabel(): string {
    return PLATAFORMS_LABELS[this.plataform];
  }

  get statusLabel(): string {
    return TOURNAMENT_STATUS_LABELS[this.status];
  }

  constructor(private confirmationService: ConfirmationService) {}


  confirmSubscription(event: Event) {
    console.log('🔍 Abrindo modal de confirmação...');

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você tem certeza que quer participar desse torneio?',
      header: 'Confirmar Participação',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Sim, Participar'
      },
      accept: () => {
        console.log('✅ Emitindo evento de inscrição:', { tournamentId: this.tournamentId, userId: this.userId });
        this.subscription.emit({ tournamentId: this.tournamentId, userId: this.userId });
      }
    });
  }

}
