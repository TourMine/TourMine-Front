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

  tournaments = [
    {
      title: "Title 1",
      subtitle: "subtitle 1",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio saepe a praesentium aperiam, esse quam vero eligendi pariatur molestias magnam accusamus quisquam enim. Dignissimos voluptates non ex corporis aliquam consequuntur!"
    },
    {
      title: "Title 2",
      subtitle: "subtitle 2",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio saepe a praesentium aperiam, esse quam vero eligendi pariatur molestias magnam accusamus quisquam enim. Dignissimos voluptates non ex corporis aliquam consequuntur!"
    },
    {
      title: "Title 3",
      subtitle: "subtitle 3",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio saepe a praesentium aperiam, esse quam vero eligendi pariatur molestias magnam accusamus quisquam enim. Dignissimos voluptates non ex corporis aliquam consequuntur!"
    },
    {
      title: "Title 4",
      subtitle: "subtitle 4",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio saepe a praesentium aperiam, esse quam vero eligendi pariatur molestias magnam accusamus quisquam enim. Dignissimos voluptates non ex corporis aliquam consequuntur!"
    }
  ]
}
