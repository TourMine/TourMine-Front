import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardMainComponent } from '../../../shared/components/card-main/card-main.component';
import { TabsModule } from 'primeng/tabs';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { TournamentStatusButtonComponent } from '../../../shared/components/tournament-status-button/tournament-status-button.component';
import { Tournament } from '../../../models/tournament/tournaments';
import { EGames, GAME_LABELS } from '../../../models/tournament/enums/games.enum';
import { EPlataforms, PLATAFORMS_LABELS } from '../../../models/tournament/enums/plataforms.enum';
import { ESubscriptionType, SUBSCRIPTION_TYPE_LABELS } from '../../../models/tournament/enums/subscription-type.enum';
import { ETournamentStatus, TOURNAMENT_STATUS_LABELS } from '../../../models/tournament/enums/tournament-status.enum';
import { EParticipantsType, PARTICIPANTS_TYPE_LABELS } from '../../../models/tournament/enums/participants-type.enum';

@Component({
  selector: 'app-tournament-detail',
  imports: [
    CommonModule,
    CardMainComponent,
    TabsModule,
    PanelModule,
    DividerModule,
    ButtonModule,
    TournamentStatusButtonComponent
  ],
  templateUrl: './tournament-detail.component.html',
  styleUrl: './tournament-detail.component.scss'
})
export class TournamentDetailComponent implements OnInit {
  tournament!: Tournament;
  tournamentStatus: number = 2

  getGameLabel(game: string): string {
    return GAME_LABELS[game as EGames] || 'Desconhecido';
  }

  getPlataformLabel(plataform: number): string {
    return PLATAFORMS_LABELS[plataform as EPlataforms] || 'Desconhecida';
  }

  getSubscriptionTypeLabel(subscription: number): string {
    return SUBSCRIPTION_TYPE_LABELS[subscription as ESubscriptionType] || 'Desconhecida';
  }

  getTournamentStatusLabel(status: number): string {
    return TOURNAMENT_STATUS_LABELS[status as ETournamentStatus || 'Desconhecido'];
  }

  getParticipantsTypeLabel(participant_type: number): string {
    return PARTICIPANTS_TYPE_LABELS[participant_type as EParticipantsType || 'Desconhecido']
  }

  ngOnInit(): void {
    this.tournament = {
      userId: '1',
      name: 'Campeonato Nacional de CS:GO',
      game: 'CSGO',
      plataform: 1, // Suponha que 1 representa PC
      maxTeams: 16,
      teamsType: 5, // Suponha que seja times de 5 jogadores
      startDate: '2024-09-10T18:00:00Z',
      endDate: '2024-09-20T22:00:00Z',
      prize: 'R$ 50.000',
      subscriptionType: 1, // Suponha que 1 seja inscrição gratuita
      status: 2, // Suponha que 2 seja "Inscrições Abertas"
      description: 'O maior torneio nacional de CS:GO com os melhores times do país!',
    }
  }
}
