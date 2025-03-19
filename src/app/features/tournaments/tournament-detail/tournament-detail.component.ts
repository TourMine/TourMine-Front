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
import { TournamentService } from '../../../services/tournament/tournament-service.service';
import { ActivatedRoute } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-tournament-detail',
  imports: [
    CommonModule,
    CardMainComponent,
    TabsModule,
    PanelModule,
    DividerModule,
    ButtonModule,
    TournamentStatusButtonComponent,
    ProgressSpinnerModule,
    ToastModule
  ],
  templateUrl: './tournament-detail.component.html',
  styleUrl: './tournament-detail.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class TournamentDetailComponent implements OnInit {
  tournament!: Tournament;
  organizerEmail: string | null = null;
  loading: boolean = true;
  error: string | null = null;

  gameImages: { [key: string]: string } = {
    'FIFA': 'assets/images/fifa.jpg',
    'CSGO2': 'assets/images/csgo.jpg',
    'LEAGUE_OF_LEGENDS': 'assets/images/lol.jpg',
    'VALORANT': 'assets/images/valorant.jpg',
    'FORTNITE': 'assets/images/fortnite.jpg',
  };

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

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private usersService: UsersService,
    private messageService: MessageService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchTournament(id);
    } else {
      this.error = 'ID do torneio não encontrado!';
      this.loading = false;
    }
  }

  fetchTournament(id: string): void {
    this.tournamentService.getTournamentById(id).subscribe({
      next: (data) => {
        this.tournament = data;
        this.fetchOrganizerEmail(data.userId);
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao buscar torneio: ' + err });
        this.error = 'Erro ao carregar torneio.';
        this.loading = false;
      }
    });
  }

  fetchOrganizerEmail(userId: string): void {
    this.usersService.getUserById(userId).subscribe({
      next: (user: any) => {
        this.organizerEmail = user.email;
      },
      error: (err) => {
        this.error = 'Erro ao carregar informações do organizador.';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao buscar organizador:' + err });
      }
    });
  }

}
