import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../../services/subscription/subscription.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { forkJoin, Observable } from 'rxjs';
import { TournamentService } from '../../../services/tournament/tournament-service.service';
import { CardMainComponent } from '../../../shared/components/card-main/card-main.component';

@Component({
  selector: 'app-my-subscriptions',
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    ToastModule,
    CardModule,
    CardMainComponent
  ],
  templateUrl: './my-subscriptions.component.html',
  styleUrl: './my-subscriptions.component.scss',
  providers: [MessageService]
})
export class MySubscriptionsComponent implements OnInit {
  subscriptions: any[] = [];
  userId: string = "a01d89d1-7ed3-46e7-9c9a-19260914ca61";
  loading: boolean = false;

  constructor(
    private subscriptionService: SubscriptionService,
    private tournamentService: TournamentService,
    private messageService: MessageService) {}

  ngOnInit() {
    this.loadSubscriptions();
  }

  loadSubscriptions() {
    this.loading = true;

    this.subscriptionService.getAllSubscriptionsByUserId(this.userId).subscribe({
      next: (response: any) => {
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

}
