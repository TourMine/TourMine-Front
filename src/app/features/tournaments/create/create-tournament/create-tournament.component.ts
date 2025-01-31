import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { CardMainComponent } from '../../../../shared/components/card-main/card-main.component';
import { DropdownComponent } from '../../../../shared/components/dropdown/dropdown.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TournamentServiceService } from '../../../../services/tournament/tournament-service.service';
import { Tournament } from '../../../../models/tournaments';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-tournament',
  imports: [
    MatFormFieldModule, 
    MatSelectModule, 
    ButtonComponent, 
    CardMainComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './create-tournament.component.html',
  styleUrl: './create-tournament.component.scss'
})
export class CreateTournamentComponent {

  formulario = new FormGroup({
    name: new FormControl('', Validators.required),
    game: new FormControl('', Validators.required),
    plataform: new FormControl(1, Validators.required),
    maxTeams: new FormControl(0, [Validators.required, Validators.min(2)]),
    teamsType: new FormControl(1, Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    prize: new FormControl('', Validators.required),
    subscriptionType: new FormControl(1, Validators.required),
    status: new FormControl(1, Validators.required),
    description: new FormControl('', Validators.required),
  });

  successMessage: string = '';

  constructor(private TournamentService: TournamentServiceService) {}

  criarTorneio() {
    if (this.formulario.valid) {
      const torneio = {
        name: this.formulario.value.name,
        game: this.formulario.value.game,
        plataform: Number(this.formulario.value.plataform),
        maxTeams: Number(this.formulario.value.maxTeams),
        teamsType: Number(this.formulario.value.teamsType),
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        prize: this.formulario.value.prize,
        subscriptionType: Number(this.formulario.value.subscriptionType),
        status: Number(this.formulario.value.status),
        description: this.formulario.value.description
      };
  
      console.log('Enviando torneio:', torneio);
      console.log('Valores do formulário:', this.formulario.value);
  
      this.TournamentService.createTournament(torneio).subscribe({
        next: (response) => {
          console.log('Torneio criado com sucesso!', response);
          this.formulario.reset();

          // Exibir a mensagem de sucesso
          this.successMessage = 'Torneio criado com sucesso!';
          
          // Ocultar a mensagem após 5 segundos
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        },
        error: (error) => {
          console.error('Erro ao criar torneio', error);
        }
      });
    }
  }
}

