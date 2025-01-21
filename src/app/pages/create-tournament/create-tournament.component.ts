import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ButtonComponent } from '../../shared/button/button.component';
import { InputComponent } from '../../shared/input/input.component';
import { CardMainComponent } from '../../shared/card-main/card-main.component';
import { DropdownComponent } from '../../shared/dropdown/dropdown.component';

@Component({
  selector: 'app-create-tournament',
  imports: [
    MatFormFieldModule, 
    MatSelectModule, 
    ButtonComponent, 
    InputComponent, 
    CardMainComponent,
    DropdownComponent
  ],
  templateUrl: './create-tournament.component.html',
  styleUrl: './create-tournament.component.scss'
})
export class CreateTournamentComponent {
  
}
