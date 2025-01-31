import { Component, OnInit } from '@angular/core';
import { TournamentServiceService } from '../../../../services/tournament/tournament-service.service';
import { CommonModule } from '@angular/common';
import { CardMainComponent } from '../../../../shared/components/card-main/card-main.component';


@Component({
  selector: 'app-list-tournaments',
  imports: [
    CommonModule,
    CardMainComponent
  ],
  templateUrl: './list-tournaments.component.html',
  styleUrl: './list-tournaments.component.scss'
})
export class ListTournamentsComponent implements OnInit {
  tournaments: any[] = [];
  
  constructor(private tournamentService: TournamentServiceService) {}

  ngOnInit() {
    this.listAllTournaments();
  }


  listAllTournaments() {
    this.tournamentService.getAllTournaments().subscribe({
      next: (data: any) => {
        this.tournaments = data.items;
        console.log('Torneios carregados:', this.tournaments);
      },
      error: (error) => {
        console.error('Erro ao buscar torneios', error);
      }
    });
  }
}
