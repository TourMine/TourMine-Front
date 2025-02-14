import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from '../../../../services/tournament/tournament-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-tournament',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-tournament.component.html',
  styleUrl: './update-tournament.component.scss'
})
export class UpdateTournamentComponent implements OnInit {

  tournamentData: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tournamentService: TournamentService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTournament(id);
    }
  }

  loadTournament(id: string) {
    this.tournamentService.getTournamentById(id).subscribe(
      (data) => {
        this.tournamentData = data;
      },
      (error) => {
        console.error('Erro ao carregar torneio:', error);
      }
    );
  }

  updateTournament() {
    this.tournamentService.updateTournament(this.tournamentData.id, this.tournamentData).subscribe(
      () => {
        console.log('Torneio atualizado com sucesso!');
        this.router.navigate(['/tournaments/list']);
      },
      (error) => {
        console.error('Erro ao atualizar torneio:', error);
      }
    );
  }
}