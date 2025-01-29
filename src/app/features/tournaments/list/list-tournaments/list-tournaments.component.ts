import { Component } from '@angular/core';
import { CardMainComponent } from '../../../../shared/components/card-main/card-main.component';
import { TournamentCardComponent } from '../../../../shared/components/tournament-card/tournament-card.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-list-tournaments',
  imports: [
    CardMainComponent,
    TournamentCardComponent,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './list-tournaments.component.html',
  styleUrl: './list-tournaments.component.scss',
})
export class ListTournamentsComponent {

}
