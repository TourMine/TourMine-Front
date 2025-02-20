import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-tournament-card',
  imports: [
    CommonModule,
    MatCardModule,
    ButtonComponent
  ],
  templateUrl: './tournament-card.component.html',
  styleUrl: './tournament-card.component.scss'
})
export class TournamentCardComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() description!: string
}
