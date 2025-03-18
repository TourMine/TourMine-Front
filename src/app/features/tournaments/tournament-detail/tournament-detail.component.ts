import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardMainComponent } from '../../../shared/components/card-main/card-main.component';
import { TabsModule } from 'primeng/tabs';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { TournamentStatusButtonComponent } from '../../../shared/components/tournament-status-button/tournament-status-button.component';

@Component({
  selector: 'app-tournament-detail',
  imports: [
    CommonModule,
    CardMainComponent,
    TabsModule,
    PanelModule,
    DividerModule,
    ButtonModule,
    TournamentStatusButtonComponent
  ],
  templateUrl: './tournament-detail.component.html',
  styleUrl: './tournament-detail.component.scss'
})
export class TournamentDetailComponent {
  tournamentStatus: number = 2
}
