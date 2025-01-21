import { Routes } from '@angular/router';
import { ListTournamentsComponent } from './pages/list-tournaments/list-tournaments.component';
import { CreateTournamentComponent } from './pages/create-tournament/create-tournament.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tournaments', pathMatch: 'full' },
    { path: 'tournaments', component: ListTournamentsComponent },
    { path: 'tournaments/create', component: CreateTournamentComponent },
    { path: '**', redirectTo: 'tournaments' },
];
