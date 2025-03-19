import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../../services/subscription/subscription.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { forkJoin, Observable } from 'rxjs';
import { TournamentService } from '../../../services/tournament/tournament-service.service';
import { CardMainComponent } from '../../../shared/components/card-main/card-main.component';
import { AuthService } from '../../../services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { TournamentStatusButtonComponent } from '../../../shared/components/tournament-status-button/tournament-status-button.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { EPlataforms, PLATAFORMS_LABELS } from '../../../models/tournament/enums/plataforms.enum';
import { ETournamentStatus, TOURNAMENT_STATUS_LABELS } from '../../../models/tournament/enums/tournament-status.enum';
import { EGames, GAME_LABELS } from '../../../models/tournament/enums/games.enum';
import { ESubscriptionType, SUBSCRIPTION_TYPE_LABELS } from '../../../models/tournament/enums/subscription-type.enum';

@Component({
  selector: 'app-my-subscriptions',
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    ToastModule,
    CardModule,
    CardMainComponent,
    RouterModule,
    TournamentStatusButtonComponent,
    ButtonModule,
    PaginatorModule,
    ConfirmDialogModule
  ],
  templateUrl: './my-subscriptions.component.html',
  styleUrl: './my-subscriptions.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class MySubscriptionsComponent implements OnInit {
  
  subscriptions: any[] = [];
  userId: string | null = null;
  paginatedSubscriptions: any[] = [];

  selectedSubscription = null;

  loading: boolean = false;

  first: number = 0;
  rows: number = 5; // Itens por página
  totalRecords: number = 0;
  

  getGameLabel(game: string): string {
    return GAME_LABELS[game as EGames] || 'Desconhecido';
  }

  getPlataformLabel(plataform: number): string {
    return PLATAFORMS_LABELS[plataform as EPlataforms] || 'Desconhecida';
  }

  getSubscriptionTypeLabel(subscription: number): string {
    return SUBSCRIPTION_TYPE_LABELS[subscription as ESubscriptionType] || 'Desconhecida';
  }

  constructor(
    private subscriptionService: SubscriptionService,
    private tournamentService: TournamentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService, 
    private authService: AuthService) {}

  ngOnInit() {
    this.userId = this.authService.getUserId(); // Obtendo o userId do AuthService
    if (this.userId) {
      this.loadSubscriptions();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Usuário não autenticado' });
    }
  }

  loadSubscriptions() {
    if (!this.userId) return;
    this.loading = true;
  
    this.subscriptionService.getAllSubscriptionsByUserId(this.userId).subscribe({
      next: (response: any) => {
        console.log('Respostas de Inscrição:', response);
        if (response.total === 0) {
          this.subscriptions = [];
          this.loading = false;
          return;
        }
        const tournamentRequests: Observable<any>[] = response.items.map((sub: any) =>
          this.tournamentService.getTournamentById(sub.tournamentId)
        );
        forkJoin(tournamentRequests).subscribe({
          next: (tournamentDetails: any[]) => {
            this.subscriptions = response.items.map((sub: any, index: number) => ({
              ...sub,
              tournament: tournamentDetails[index]
            }));
            this.totalRecords = this.subscriptions.length;
            this.updatePaginatedSubscriptions();
            this.loading = false;
          },
          error: () => {
            this.loading = false;
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar torneios' });
          }
        });
      },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar suas inscrições' });
      }
    });
  }

  // Método chamado ao mudar de página
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedSubscriptions();
  }

  // Atualiza a lista de exibição conforme a página atual
  updatePaginatedSubscriptions() {
    const start = this.first;
    const end = this.first + this.rows;
    this.paginatedSubscriptions = this.subscriptions.slice(start, end);
  }

  confirmCancellation(event: Event, subscription: any): void {
    this.selectedSubscription = subscription;
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Tem certeza de que deseja cancelar sua inscrição neste torneio?',
        header: 'Cancelar inscrição',
        closable: true,
        closeOnEscape: true,
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancelar',
        rejectButtonProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true,
        },
        acceptLabel: 'Confirmar',
        acceptButtonProps: {
            label: 'Confirmar',
        },

        accept: () => {
          if (this.selectedSubscription) {
            this.paginatedSubscriptions = this.paginatedSubscriptions.filter(t => t !== this.selectedSubscription);
            this.selectedSubscription = null;
            this.messageService.add({ 
              severity: 'success',
              summary: 'Sucesso', 
              detail: 'Inscrição cancelada com sucesso' 
            });
          }
        },
        reject: () => {
          // this.messageService.add({ 
          //   severity: 'error', 
          //   summary: 'Cancelado', 
          //   detail: '',
          //   life: 3000
          // });
        },
    });
  }

}
