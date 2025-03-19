import { Component } from '@angular/core';
import { CardMainComponent } from '../../../shared/components/card-main/card-main.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Tournament } from '../../../models/tournament/tournaments';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { EGames, GAME_LABELS } from '../../../models/tournament/enums/games.enum';
import { EPlataforms, PLATAFORMS_LABELS } from '../../../models/tournament/enums/plataforms.enum';
import { ESubscriptionType, SUBSCRIPTION_TYPE_LABELS } from '../../../models/tournament/enums/subscription-type.enum';
import { ETournamentStatus, TOURNAMENT_STATUS_LABELS } from '../../../models/tournament/enums/tournament-status.enum';


@Component({
  selector: 'app-my-tournaments',
  imports: [
    CommonModule,
    CardMainComponent,
    TableModule,
    ButtonModule,
    ConfirmDialog,
    ToastModule
  ],
  templateUrl: './my-tournaments.component.html',
  styleUrl: './my-tournaments.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class MyTournamentsComponent {
  tournaments: Tournament[] = [];
  selectedTournament: Tournament | null = null;

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

  constructor(private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.tournaments = [
      {
        userId: '123',
        name: 'Torneio de VALORANT #1',
        game: 'VALORANT',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de VALORANT da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de LEAGUE_OF_LEGENDS',
        game: 'LEAGUE_OF_LEGENDS',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 8,
        teamsType: 2, // Exemplo de tipo de equipe (Equipe)
        startDate: '2024-12-20T19:30:00Z',
        endDate: '2024-12-23T23:00:00Z',
        prize: 'R$ 2.000',
        subscriptionType: 2, // Exemplo de tipo de inscrição (Paga)
        status: 3, // Exemplo de status (Em andamento)
        description: 'Campeonato competitivo de LoL.'
      },
      {
        userId: '123',
        name: 'Torneio de VALORANT #1',
        game: 'VALORANT',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de VALORANT da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de LEAGUE_OF_LEGENDS',
        game: 'LEAGUE_OF_LEGENDS',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 8,
        teamsType: 2, // Exemplo de tipo de equipe (Equipe)
        startDate: '2024-12-20T19:30:00Z',
        endDate: '2024-12-23T23:00:00Z',
        prize: 'R$ 2.000',
        subscriptionType: 2, // Exemplo de tipo de inscrição (Paga)
        status: 3, // Exemplo de status (Em andamento)
        description: 'Campeonato competitivo de LoL.'
      },
      {
        userId: '123',
        name: 'Torneio de VALORANT #1',
        game: 'VALORANT',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de VALORANT da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de LEAGUE_OF_LEGENDS',
        game: 'LEAGUE_OF_LEGENDS',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 8,
        teamsType: 2, // Exemplo de tipo de equipe (Equipe)
        startDate: '2024-12-20T19:30:00Z',
        endDate: '2024-12-23T23:00:00Z',
        prize: 'R$ 2.000',
        subscriptionType: 2, // Exemplo de tipo de inscrição (Paga)
        status: 3, // Exemplo de status (Em andamento)
        description: 'Campeonato competitivo de LoL.'
      },
      {
        userId: '123',
        name: 'Torneio de VALORANT #1',
        game: 'VALORANT',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de VALORANT da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de LEAGUE_OF_LEGENDS',
        game: 'LEAGUE_OF_LEGENDS',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 8,
        teamsType: 2, // Exemplo de tipo de equipe (Equipe)
        startDate: '2024-12-20T19:30:00Z',
        endDate: '2024-12-23T23:00:00Z',
        prize: 'R$ 2.000',
        subscriptionType: 2, // Exemplo de tipo de inscrição (Paga)
        status: 3, // Exemplo de status (Em andamento)
        description: 'Campeonato competitivo de LoL.'
      },
      {
        userId: '123',
        name: 'Torneio de VALORANT #1',
        game: 'VALORANT',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de VALORANT da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de LEAGUE_OF_LEGENDS',
        game: 'LEAGUE_OF_LEGENDS',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 8,
        teamsType: 2, // Exemplo de tipo de equipe (Equipe)
        startDate: '2024-12-20T19:30:00Z',
        endDate: '2024-12-23T23:00:00Z',
        prize: 'R$ 2.000',
        subscriptionType: 2, // Exemplo de tipo de inscrição (Paga)
        status: 3, // Exemplo de status (Em andamento)
        description: 'Campeonato competitivo de LoL.'
      },
      {
        userId: '123',
        name: 'Torneio de VALORANT #1',
        game: 'VALORANT',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de VALORANT da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de LEAGUE_OF_LEGENDS',
        game: 'LEAGUE_OF_LEGENDS',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 8,
        teamsType: 2, // Exemplo de tipo de equipe (Equipe)
        startDate: '2024-12-20T19:30:00Z',
        endDate: '2024-12-23T23:00:00Z',
        prize: 'R$ 2.000',
        subscriptionType: 2, // Exemplo de tipo de inscrição (Paga)
        status: 3, // Exemplo de status (Em andamento)
        description: 'Campeonato competitivo de LoL.'
      },
      {
        userId: '123',
        name: 'Torneio de VALORANT #1',
        game: 'VALORANT',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de VALORANT da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de LEAGUE_OF_LEGENDS',
        game: 'LEAGUE_OF_LEGENDS',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 8,
        teamsType: 2, // Exemplo de tipo de equipe (Equipe)
        startDate: '2024-12-20T19:30:00Z',
        endDate: '2024-12-23T23:00:00Z',
        prize: 'R$ 2.000',
        subscriptionType: 2, // Exemplo de tipo de inscrição (Paga)
        status: 3, // Exemplo de status (Em andamento)
        description: 'Campeonato competitivo de LoL.'
      },
      {
        userId: '123',
        name: 'Torneio de VALORANT #1',
        game: 'VALORANT',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de VALORANT da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de LEAGUE_OF_LEGENDS',
        game: 'LEAGUE_OF_LEGENDS',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 8,
        teamsType: 2, // Exemplo de tipo de equipe (Equipe)
        startDate: '2024-12-20T19:30:00Z',
        endDate: '2024-12-23T23:00:00Z',
        prize: 'R$ 2.000',
        subscriptionType: 2, // Exemplo de tipo de inscrição (Paga)
        status: 4, // Exemplo de status (Em andamento)
        description: 'Campeonato competitivo de LoL.'
      },
      {
        userId: '123',
        name: 'Torneio de VALORANT #1',
        game: 'VALORANT',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 4, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de VALORANT da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de LEAGUE_OF_LEGENDS',
        game: 'LEAGUE_OF_LEGENDS',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 8,
        teamsType: 2, // Exemplo de tipo de equipe (Equipe)
        startDate: '2024-12-20T19:30:00Z',
        endDate: '2024-12-23T23:00:00Z',
        prize: 'R$ 2.000',
        subscriptionType: 2, // Exemplo de tipo de inscrição (Paga)
        status: 3, // Exemplo de status (Em andamento)
        description: 'Campeonato competitivo de LoL.'
      },
      {
        userId: '123',
        name: 'Torneio de VALORANT #1',
        game: 'VALORANT',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de VALORANT da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de LEAGUE_OF_LEGENDS',
        game: 'LEAGUE_OF_LEGENDS',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 8,
        teamsType: 2, // Exemplo de tipo de equipe (Equipe)
        startDate: '2024-12-20T19:30:00Z',
        endDate: '2024-12-23T23:00:00Z',
        prize: 'R$ 2.000',
        subscriptionType: 2, // Exemplo de tipo de inscrição (Paga)
        status: 4, // Exemplo de status (Em andamento)
        description: 'Campeonato competitivo de LoL.'
      },
    ];
  }

  showDetails(): void {
    this.router.navigate(['tournaments/id']);
  }

  editTournament(): void {
    this.router.navigate(['tournaments/update/' + 1]);
  }

  confirmDelete(event: Event, tournament: Tournament): void {
    this.selectedTournament = tournament;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Tem certeza que deseja cancelar este torneio?',
      header: 'Cancelar Torneio',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Confirmar',
      },
      accept: () => {
        if (this.selectedTournament) {
          this.tournaments = this.tournaments.filter(t => t !== this.selectedTournament);
          this.selectedTournament = null;
          this.messageService.add({ 
            severity: 'success',
            summary: 'Sucesso', 
            detail: 'Torneio excluído' 
          });
        }
      },
      reject: () => {
        // this.messageService.add({ 
        //   severity: 'error', 
        //   summary: 'Cancelado', 
        //   detail: 'Exclusão cancelada',
        //   life: 3000
        // });
      }
    });
  }
}
