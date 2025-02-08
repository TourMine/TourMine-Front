import { Routes } from '@angular/router';
import { CreateTournamentComponent } from './features/tournaments/create/create-tournament/create-tournament.component';
import { ListTournamentsComponent } from './features/tournaments/list/list-tournaments/list-tournaments.component';
import { UpdateTournamentComponent } from './features/tournaments/update/update-tournament/update-tournament.component';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './layouts/home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'tournaments/list', component: ListTournamentsComponent },
            { path: 'tournaments/create', component: CreateTournamentComponent },
            { path: 'tournaments/update/:id', component: UpdateTournamentComponent},
        ]
    },

    { path: '**', redirectTo: 'login' },
];
