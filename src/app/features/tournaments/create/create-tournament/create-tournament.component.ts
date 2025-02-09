import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CardMainComponent } from '../../../../shared/components/card-main/card-main.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TournamentServiceService } from '../../../../services/tournament/tournament-service.service';
import { Tournament } from '../../../../models/tournaments';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';


@Component({
  selector: 'app-create-tournament',
  imports: [
    MatFormFieldModule, 
    MatSelectModule, 
    ButtonComponent, 
    CardMainComponent,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    SelectModule,
    InputNumberModule,
    DatePicker,
    TextareaModule
  ],
  templateUrl: './create-tournament.component.html',
  styleUrl: './create-tournament.component.scss'
})
export class CreateTournamentComponent {
  gameOptions = [
    { label: 'FIFA', value: 'FIFA' },
    { label: 'CS:GO 2', value: 'CS:GO 2' },
    { label: 'League of Legends', value: 'League of Legends' },
    { label: 'Valorant', value: 'Valorant' },
    { label: 'Fortnite', value: 'Fortnite' },
    { label: 'Outro', value: 'Outro' }
  ];
  plataformOptions = [
    { label: 'PC', value: 1 },
    { label: 'Console', value: 2 },
    { label: 'Mobile', value: 3 }
  ];
  teamsTypeOptions = [
    { label: 'Solo', value: 1 },
    { label: 'Duplas', value: 2 },
    { label: 'Times', value: 3 }
  ];
  subscriptionTypeOptions = [
    { label: 'Grátis', value: 1 },
    { label: 'Pago', value: 2 },
  ];
  statusOptions = [
    { label: 'Aberto', value: 1 },
    { label: 'Fechado', value: 2 }
  ]

  createTournamentForm = new FormGroup({
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
    if (this.createTournamentForm.valid) {
      const torneio = {
        name: this.createTournamentForm.value.name,
        game: this.createTournamentForm.value.game,
        plataform: Number(this.createTournamentForm.value.plataform),
        maxTeams: Number(this.createTournamentForm.value.maxTeams),
        teamsType: Number(this.createTournamentForm.value.teamsType),
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        prize: this.createTournamentForm.value.prize,
        subscriptionType: Number(this.createTournamentForm.value.subscriptionType),
        status: Number(this.createTournamentForm.value.status),
        description: this.createTournamentForm.value.description
      };
  
      console.log('Enviando torneio:', torneio);
      console.log('Valores do formulário:', this.createTournamentForm.value);
  
      this.TournamentService.createTournament(torneio).subscribe({
        next: (response) => {
          console.log('Torneio criado com sucesso!', response);
          this.createTournamentForm.reset();

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

