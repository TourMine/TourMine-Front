import { Routes } from '@angular/router';
import { CreateTournamentComponent } from './features/tournaments/create/create-tournament/create-tournament.component';
import { ListTournamentsComponent } from './features/tournaments/list/list-tournaments/list-tournaments.component';
import { UpdateTournamentComponent } from './features/tournaments/update/update-tournament/update-tournament.component';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './layouts/home/home.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { ProfilePageComponent } from './features/profile/profile-page/profile-page.component';
import { MySubscriptionsComponent } from './features/subscriptions/my-subscriptions/my-subscriptions.component';
import { AuthGuard } from './services/auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
            { path: 'tournaments/list', component: ListTournamentsComponent, canActivate: [AuthGuard] },
            { path: 'tournaments/create', component: CreateTournamentComponent, canActivate: [AuthGuard] },
            { path: 'tournaments/update/:id', component: UpdateTournamentComponent, canActivate: [AuthGuard]},
            { path: 'my-subscriptions', component: MySubscriptionsComponent, canActivate: [AuthGuard]}
        ]
    },

    { path: '**', redirectTo: 'login' },
];
