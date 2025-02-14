import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CardMainComponent } from '../../../../shared/components/card-main/card-main.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TournamentServiceService } from '../../../../services/tournament/tournament-service.service';
import { Tournament } from '../../../../models/tournament/tournaments';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { EParticipantsType, PARTICIPANTS_TYPE_LABELS } from '../../../../models/tournament/enums/participants-type.enum';
import { EPlataforms, PLATAFORMS_LABELS } from '../../../../models/tournament/enums/plataforms.enum';
import { ESubscriptionType, SUBSCRIPTION_TYPE_LABELS } from '../../../../models/tournament/enums/subscription-type.enum';
import { ETournamentStatus, TOURNAMENT_STATUS_LABELS } from '../../../../models/tournament/enums/tournament-status.enum';
import { EGames, GAME_LABELS } from '../../../../models/tournament/enums/games.enum';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@Component({
  selector: 'app-create-tournament',
  imports: [
    MatFormFieldModule, 
    MatSelectModule, 
    CardMainComponent,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    SelectModule,
    InputNumberModule,
    DatePicker,
    TextareaModule,
    ToastModule,
    ConfirmDialogModule
  ],
  templateUrl: './create-tournament.component.html',
  styleUrl: './create-tournament.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class CreateTournamentComponent {
  minStartDate: Date = new Date();
  minEndDate: Date = new Date();
  
  loading: boolean = false;

  participantsTypeOptions = Object.keys(EParticipantsType)
    .filter(key => !isNaN(Number(EParticipantsType[key as keyof typeof EParticipantsType])))
    .map(key => {
      const value = Number(EParticipantsType[key as keyof typeof EParticipantsType]);
      return { label: PARTICIPANTS_TYPE_LABELS[value as EParticipantsType], value };
  });

  platformsOptions = Object.keys(EPlataforms)
    .filter(key => !isNaN(Number(EPlataforms[key as keyof typeof EPlataforms])))
    .map(key => {
      const value = Number(EPlataforms[key as keyof typeof EPlataforms]);
      return { label: PLATAFORMS_LABELS[value as EPlataforms], value };
  });

  subscriptionTypesOptions = Object.keys(ESubscriptionType)
    .filter(key => !isNaN(Number(ESubscriptionType[key as keyof typeof ESubscriptionType])))
    .map(key => {
      const value = Number(ESubscriptionType[key as keyof typeof ESubscriptionType]);
      return { label: SUBSCRIPTION_TYPE_LABELS[value as ESubscriptionType], value };
  });

  tournamentStatusesOptions = Object.keys(ETournamentStatus)
    .filter(key => !isNaN(Number(ETournamentStatus[key as keyof typeof ETournamentStatus])))
    .map(key => {
      const value = Number(ETournamentStatus[key as keyof typeof ETournamentStatus]);
      return { label: TOURNAMENT_STATUS_LABELS[value as ETournamentStatus], value };
  });

  gamesOptions = Object.values(EGames)
    .map(game => ({
      label: GAME_LABELS[game],
      value: game
    }))

  createTournamentForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    game: new FormControl(null, Validators.required),
    plataform: new FormControl(null, Validators.required),
    maxTeams: new FormControl(2, [Validators.required, Validators.min(2)]),
    teamsType: new FormControl(null, Validators.required),
    startDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null, Validators.required),
    prize: new FormControl(null, Validators.required),
    subscriptionType: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
  });

  successMessage: string = '';

  constructor(private TournamentService: TournamentServiceService, private router: Router, private messageService: MessageService) {
    this.createTournamentForm.get('startDate')?.valueChanges.subscribe((startDate) => {
      if (startDate) {
        this.minEndDate = new Date(startDate);
        this.minEndDate.setDate(this.minEndDate.getDate() + 1);
      }
    });
  }

  criarTorneio() {
    this.loading = true;
    if (this.createTournamentForm.valid) {
      const torneio: Tournament = {
        name: this.createTournamentForm.value.name!,
        game: this.createTournamentForm.value.game!,
        plataform: Number(this.createTournamentForm.value.plataform),
        maxTeams: Number(this.createTournamentForm.value.maxTeams),
        teamsType: Number(this.createTournamentForm.value.teamsType),
        startDate: new Date(this.createTournamentForm.value.startDate!).toISOString(),
        endDate: new Date(this.createTournamentForm.value.endDate!).toISOString(),
        prize: this.createTournamentForm.value.prize!,
        subscriptionType: Number(this.createTournamentForm.value.subscriptionType),
        status: 1,
        description: this.createTournamentForm.value.description!
      };
  
      this.TournamentService.createTournament(torneio).subscribe({
        next: (response) => {
          this.createTournamentForm.reset();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Torneio Criado!' });

          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/tournaments/list']);
          }, 2000);
          
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Criação Falhou!' });
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

}

