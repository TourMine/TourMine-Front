import { Component, OnInit, ViewChild } from '@angular/core';
import { TournamentService } from '../../../../services/tournament/tournament-service.service';
import { CommonModule } from '@angular/common';
import { CardMainComponent } from '../../../../shared/components/card-main/card-main.component';
import { Router } from '@angular/router';
import { TournamentCardComponent } from '../../../../shared/components/tournament-card/tournament-card.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SubscriptionService } from '../../../../services/subscription/subscription.service';

@Component({
  selector: 'app-list-tournaments',
  imports: [
    CommonModule,
    CardMainComponent,
    TournamentCardComponent,
    InputTextModule,
    InputIcon,
    IconField,
    PaginatorModule,
    ProgressSpinnerModule,
    ToastModule,
    ConfirmDialogModule
  ],
  templateUrl: './list-tournaments.component.html',
  styleUrl: './list-tournaments.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class ListTournamentsComponent implements OnInit {
  tournaments: any[] = [];
  filteredTournaments: any[] = [];
  paginatedTournaments: any[] = [];
  rows = 8;
  first = 0;
  loading: boolean = false;

  gameImages: { [key: string]: string } = {
    'FIFA': 'assets/images/fifa.jpg',
    'CSGO2': 'assets/images/csgo.jpg',
    'LEAGUE_OF_LEGENDS': 'assets/images/lol.jpg',
    'VALORANT': 'assets/images/valorant.jpg',
    'FORTNITE': 'assets/images/fortnite.jpg',
  };

  constructor(
    private tournamentService: TournamentService, 
    private subscriptionService: SubscriptionService,
    private router: Router, 
    private messageService: MessageService) {}

  ngOnInit() {
    this.listAllTournaments();
  }

  listAllTournaments() {
    this.loading = true;
    this.tournamentService.getAllTournaments().subscribe({
      next: (data: any) => {
        this.loading = false;
        this.tournaments = data.items;
        console.log(this.tournaments)
        this.filteredTournaments = [...this.tournaments]
        console.log(this.filteredTournaments)
        this.updatePaginatedTournaments();
      },
      error: (error) => {
        this.loading = false;
        console.log('Erro ao buscar torneios', error);
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredTournaments = this.tournaments.filter(tournament =>
      tournament.name.toLowerCase().includes(filterValue) ||
      tournament.game.toLowerCase().includes(filterValue)
    );
    this.first = 0;
    this.updatePaginatedTournaments();
  }

  paginate(event: any) {
    this.first = event.first;
    this.updatePaginatedTournaments();
  }

  updatePaginatedTournaments() {
    this.paginatedTournaments = this.filteredTournaments.slice(this.first, this.first + this.rows);
  }

  updateTournament(id: string) {
    this.router.navigate(['/tournaments/update', id]);
  }

  subscribeToTournament(data: { tournamentId: string; userId: string }) {
    console.log('📩 Recebendo evento de inscrição:', data);
    this.subscriptionService.createSubscription(data).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Inscrito com sucesso!' });
        this.router.navigate(['my-subscriptions'])
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Inscrição Falhou!' });
      }
    });
  }

}
