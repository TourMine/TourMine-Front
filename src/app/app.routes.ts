import { Routes } from '@angular/router';
import { CreateTournamentComponent } from './features/tournaments/create/create-tournament/create-tournament.component';
import { ListTournamentsComponent } from './features/tournaments/list/list-tournaments/list-tournaments.component';
import { UpdateTournamentComponent } from './features/tournaments/update/update-tournament/update-tournament.component';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './layouts/home/home.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { ProfilePageComponent } from './features/profile/profile-page/profile-page.component';
import { MySubscriptionsComponent } from './features/subscriptions/my-subscriptions/my-subscriptions.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'profile', component: ProfilePageComponent },
            { path: 'tournaments/list', component: ListTournamentsComponent },
            { path: 'tournaments/create', component: CreateTournamentComponent },
            { path: 'tournaments/update/:id', component: UpdateTournamentComponent},
            { path: 'my-subscriptions', component: MySubscriptionsComponent}
        ]
    },

    { path: '**', redirectTo: 'login' },
];
