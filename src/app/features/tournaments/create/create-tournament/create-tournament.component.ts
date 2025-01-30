import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { CardMainComponent } from '../../../../shared/components/card-main/card-main.component';
import { DropdownComponent } from '../../../../shared/components/dropdown/dropdown.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateTournamentServiceService } from '../../../../services/create/create-tournament-service.service';
import { Tournament } from '../../../../models/tournaments';


@Component({
  selector: 'app-create-tournament',
  imports: [
    MatFormFieldModule, 
    MatSelectModule, 
    ButtonComponent, 
    CardMainComponent,
    ReactiveFormsModule
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

  constructor(private createTournamentService: CreateTournamentServiceService) {}

  criarTorneio() {
    if (this.formulario.valid) {
      const torneio = {
        name: this.formulario.value.name,
        game: "string",
        plataform: 1,
        maxTeams: 0,
        teamsType: 1,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        prize: "string",
        subscriptionType: 1,
        status: 1,
        description: "string"
      };
  
      console.log('Enviando torneio:', torneio);
  
      this.createTournamentService.createTournament(torneio).subscribe({
        next: (response) => {
          console.log('Torneio criado com sucesso!', response);
        },
        error: (error) => {
          console.error('Erro ao criar torneio', error);
        }
      });
    }
  }
}

