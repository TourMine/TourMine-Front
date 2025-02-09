import { Component, OnInit, ViewChild } from '@angular/core';
import { TournamentServiceService } from '../../../../services/tournament/tournament-service.service';
import { CommonModule } from '@angular/common';
import { CardMainComponent } from '../../../../shared/components/card-main/card-main.component';
import { Router } from '@angular/router';
import { TournamentCardComponent } from '../../../../shared/components/tournament-card/tournament-card.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-list-tournaments',
  imports: [
    CommonModule,
    CardMainComponent,
    TournamentCardComponent,
    InputTextModule,
    InputIcon,
    IconField,
    PaginatorModule
  ],
  templateUrl: './list-tournaments.component.html',
  styleUrl: './list-tournaments.component.scss',
})
export class ListTournamentsComponent implements OnInit {
  tournaments: any[] = [];
  filteredTournaments: any[] = [];
  paginatedTournaments: any[] = [];
  rows = 8;
  first = 0;

  gameImages: { [key: string]: string } = {
    'FIFA': 'assets/images/fifa.jpg',
    'CS:GO 2': 'assets/images/csgo.jpg',
    'League of Legends': 'assets/images/lol.jpg',
    'Valorant': 'assets/images/valorant.jpg',
    'Fortnite': 'assets/images/fortnite.jpg',
  };

  constructor(private tournamentService: TournamentServiceService, private router: Router) {}

  ngOnInit() {
    this.tournaments = [
      { id: '1', name: 'Torneio de Verão', game: 'FIFA', platform: 'PS5', maxTeams: 16, startDate: new Date(), status: 1 },
      { id: '3', name: 'Campeonato de CSGO', game: 'CS:GO 2', platform: 'PC', maxTeams: 6, startDate: new Date(), status: 1 },
      { id: '4', name: 'Campeonato de VAVA!', game: 'Valorant', platform: 'PC', maxTeams: 8, startDate: new Date(), status: 0 },
      { id: '5', name: 'Torneio de LoL', game: 'League of Legends', platform: 'PC', maxTeams: 10, startDate: new Date(), status: 1 },
      { id: '6', name: 'Torneio de Fortnite', game: 'Fortnite', platform: 'PC', maxTeams: 20, startDate: new Date(), status: 0 },
      { id: '7', name: 'Torneio de Não Sei', game: 'X', platform: 'PC', maxTeams: 20, startDate: new Date(), status: 0 },
      { id: '8', name: 'Torneio de Verão', game: 'FIFA', platform: 'PS5', maxTeams: 16, startDate: new Date(), status: 1 },
      { id: '9', name: 'Campeonato de CSGO', game: 'CS:GO 2', platform: 'PC', maxTeams: 6, startDate: new Date(), status: 1 },
      { id: '10', name: 'Campeonato de VAVA!', game: 'Valorant', platform: 'PC', maxTeams: 8, startDate: new Date(), status: 0 },
      { id: '11', name: 'Torneio de LoL', game: 'League of Legends', platform: 'PC', maxTeams: 10, startDate: new Date(), status: 1 },
      { id: '12', name: 'Torneio de Fortnite', game: 'Fortnite', platform: 'PC', maxTeams: 20, startDate: new Date(), status: 0 },
      { id: '13', name: 'Torneio de Não Sei', game: 'X', platform: 'PC', maxTeams: 20, startDate: new Date(), status: 0 },
      { id: '14', name: 'Torneio de Verão', game: 'FIFA', platform: 'PS5', maxTeams: 16, startDate: new Date(), status: 1 },
      { id: '15', name: 'Campeonato de CSGO', game: 'CS:GO 2', platform: 'PC', maxTeams: 6, startDate: new Date(), status: 1 },
      { id: '16', name: 'Campeonato de VAVA!', game: 'Valorant', platform: 'PC', maxTeams: 8, startDate: new Date(), status: 0 },
      { id: '17', name: 'Torneio de LoL', game: 'League of Legends', platform: 'PC', maxTeams: 10, startDate: new Date(), status: 1 },
      { id: '18', name: 'Torneio de Fortnite', game: 'Fortnite', platform: 'PC', maxTeams: 20, startDate: new Date(), status: 0 },
      { id: '19', name: 'Torneio de Não Sei', game: 'X', platform: 'PC', maxTeams: 20, startDate: new Date(), status: 0 },
      { id: '20', name: 'Campeonato de CSGO', game: 'CS:GO 2', platform: 'PC', maxTeams: 6, startDate: new Date(), status: 1 },
    ];
  
    //this.listAllTournaments();
    this.filteredTournaments = [...this.tournaments]
    this.updatePaginatedTournaments();
  }

  // listAllTournaments() {
  //   this.tournamentService.getAllTournaments().subscribe({
  //     next: (data: any) => {
  //       this.tournaments = data.items;
  //       this.filteredTournaments = [...this.tournaments]
  //     },
  //     error: (error) => {
  //       console.log('Erro ao buscar torneios', error);
  //     }
  //   })
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredTournaments = this.tournaments.filter(tournament =>
      tournament.name.toLowerCase().includes(filterValue) ||
      tournament.game.toLowerCase().includes(filterValue) ||
      tournament.platform.toLowerCase().includes(filterValue)
    );
    this.first = 0; // Reseta a página ao filtrar
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

}
