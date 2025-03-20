import { Component, OnInit } from '@angular/core';
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
import { TournamentService } from '../../../services/tournament/tournament-service.service';
import { AuthService } from '../../../services/auth/auth.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-my-tournaments',
  imports: [
    CommonModule,
    CardMainComponent,
    TableModule,
    ButtonModule,
    ConfirmDialog,
    ToastModule,
    ProgressSpinnerModule
  ],
  templateUrl: './my-tournaments.component.html',
  styleUrl: './my-tournaments.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class MyTournamentsComponent implements OnInit {
  tournaments: any[] = [];
  currentUserId: string | null = null;

  selectedTournament: Tournament | null = null;

  loading: boolean = false;
  subscriptions: any[] = []; // Inscrições do torneio
  selectedTournamentId: string | null = null; // ID do torneio selecionado
  selectedTournamentName: string = '';

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

  constructor(
    private tournamentService: TournamentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService, 
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.currentUserId = this.authService.getUserId(); // Obtendo o userId do AuthService
    console.log('Usuário corrente: ' + this.currentUserId)
    if (this.currentUserId) {
      this.loadTournaments();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Usuário não autenticado' });
    }
  }

  loadTournaments() {
    if (!this.currentUserId) return;
    this.loading = true;
  
    this.tournamentService.getAllTournaments().subscribe({
      next: (response: any) => {
        console.log('Respostas de todos os torneios:', response);
        if (!response || !response.items || response.items.length === 0) {
          this.tournaments = [];
        } else {
          this.tournaments = response.items.filter((tournament: any) => tournament.userId === this.currentUserId);
          console.log('Torneios filtrados: ' + this.tournaments)
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar seus torneios' });
      }
    });
  }

  showDetails(id: string): void {
    this.router.navigate(['tournaments/' + id]);
  }


  showSubscriptions(tournamentId: string): void {
    console.log(`Visualizando inscrições do torneio com ID: ${tournamentId}`);

    this.selectedTournamentId = tournamentId; // Armazenar o ID do torneio selecionado

    this.tournamentService.getTournamentSubscriptions(tournamentId).subscribe({
      next: (response: any) => {
        console.log('Inscrições recebidas:', response.items);
        this.subscriptions = response.items; // Atualiza as inscrições
        
        this.selectedTournamentId = tournamentId;
        this.getTournamentName(tournamentId); 
      },
      error: (error) => {
        console.error('Erro ao buscar inscrições:', error);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar inscrições do torneio' });
      }
    });
  }

  getTournamentName(tournamentId: string): void {
    this.tournamentService.getTournamentById(tournamentId).subscribe({
      next: (tournament: any) => {
        this.selectedTournamentName = tournament.name;  // Atribuindo o nome do torneio
        console.log('Nome do Torneio:', this.selectedTournamentName);  // Verificação no console
      },
      error: (error) => {
        console.error('Erro ao buscar o nome do torneio:', error);
      }
    });
}
  

  editTournament(id: string): void {
    this.router.navigate(['tournaments/update/' + id]);
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
