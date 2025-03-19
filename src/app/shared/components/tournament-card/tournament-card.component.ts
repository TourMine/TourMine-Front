import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { EPlataforms, PLATAFORMS_LABELS } from '../../../models/tournament/enums/plataforms.enum';
import { ETournamentStatus, TOURNAMENT_STATUS_LABELS } from '../../../models/tournament/enums/tournament-status.enum';
import { EGames, GAME_LABELS } from '../../../models/tournament/enums/games.enum';
import { AuthService } from '../../../services/auth/auth.service';
import { SubscriptionService } from '../../../services/subscription/subscription.service';

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
export class TournamentCardComponent implements OnInit {
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

  isSubscribed: boolean = true;

  get gameLabel(): string {
    return GAME_LABELS[this.game];
  }

  get plataformLabel(): string {
    return PLATAFORMS_LABELS[this.plataform];
  }

  get statusLabel(): string {
    return TOURNAMENT_STATUS_LABELS[this.status];
  }

  constructor(
    private confirmationService: ConfirmationService, 
    private authService: AuthService,
    private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.checkUserSubscription();
  }

  checkUserSubscription() {
    if (!this.userId) {
      return;
    }

    this.subscriptionService.getAllSubscriptionsByUserId(this.userId).subscribe(
      (subscriptions) => {
        this.isSubscribed = subscriptions.some((sub: any) => sub.tournamentId === this.tournamentId);
      },
      (error) => {
        console.error('Erro ao buscar inscrições do usuário:', error);
      }
    );
  }

  confirmSubscription(event: Event) {
    console.log('🔍 Abrindo modal de confirmação...');

    const loggedUserId = this.authService.getUserId();
    if (!loggedUserId) {

      console.error('Erro: Usuário não autenticado');
      return;
  }
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
        console.log('✅ Emitindo evento de inscrição:', { tournamentId: this.tournamentId, userId: loggedUserId });

        this.subscription.emit({ tournamentId: this.tournamentId, userId: loggedUserId });
      }
    });
  }
}
