import { Routes } from '@angular/router';
import { CreateTournamentComponent } from './features/tournaments/create/create-tournament/create-tournament.component';
import { ListTournamentsComponent } from './features/tournaments/list/list-tournaments/list-tournaments.component';
import { UpdateTournamentComponent } from './features/tournaments/update/update-tournament/update-tournament.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tournaments', pathMatch: 'full' },
    { path: 'tournaments', component: ListTournamentsComponent },
    { path: 'tournaments/create', component: CreateTournamentComponent },
    {path: 'tournaments/update', component: UpdateTournamentComponent},
    { path: '**', redirectTo: 'tournaments' },
];
