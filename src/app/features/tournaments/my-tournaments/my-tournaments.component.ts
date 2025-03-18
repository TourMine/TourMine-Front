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

  constructor(private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.tournaments = [
      {
        userId: '123',
        name: 'Torneio de Valorant #1',
        game: 'Valorant',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de Valorant da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de League of Legends',
        game: 'League of Legends',
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
        name: 'Torneio de Valorant #1',
        game: 'Valorant',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de Valorant da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de League of Legends',
        game: 'League of Legends',
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
        name: 'Torneio de Valorant #1',
        game: 'Valorant',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de Valorant da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de League of Legends',
        game: 'League of Legends',
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
        name: 'Torneio de Valorant #1',
        game: 'Valorant',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de Valorant da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de League of Legends',
        game: 'League of Legends',
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
        name: 'Torneio de Valorant #1',
        game: 'Valorant',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de Valorant da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de League of Legends',
        game: 'League of Legends',
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
        name: 'Torneio de Valorant #1',
        game: 'Valorant',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de Valorant da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de League of Legends',
        game: 'League of Legends',
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
        name: 'Torneio de Valorant #1',
        game: 'Valorant',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de Valorant da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de League of Legends',
        game: 'League of Legends',
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
        name: 'Torneio de Valorant #1',
        game: 'Valorant',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de Valorant da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de League of Legends',
        game: 'League of Legends',
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
        name: 'Torneio de Valorant #1',
        game: 'Valorant',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de Valorant da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de League of Legends',
        game: 'League of Legends',
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
        name: 'Torneio de Valorant #1',
        game: 'Valorant',
        plataform: 1, // Exemplo de plataforma (PC)
        maxTeams: 16,
        teamsType: 1, // Exemplo de tipo de equipe (Solo)
        startDate: '2024-11-15T18:00:00Z',
        endDate: '2024-11-17T22:00:00Z',
        prize: 'R$ 1.000',
        subscriptionType: 1, // Exemplo de tipo de inscrição (Grátis)
        status: 2, // Exemplo de status (Aberto)
        description: 'Primeiro torneio de Valorant da comunidade.'
      },
      {
        userId: '456',
        name: 'Campeonato de League of Legends',
        game: 'League of Legends',
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
      message: 'Tem certeza que deseja excluir este torneio?',
      header: 'Confirmação',
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
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Cancelado', 
          detail: 'Exclusão cancelada',
          life: 3000
        });
      }
    });
  }
}
