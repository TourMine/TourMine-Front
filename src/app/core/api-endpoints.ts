import { environment } from '../../environments/environment';

export const API_ENDPOINTS = {
  // Tournament
  createTournament: `${environment.apiUrl}/tournament/v1/create`,
  tournaments: `${environment.apiUrl}/tournament/v1/all`,
  tournamentById: (id: string) => `${environment.apiUrl}/tournament/v1/${id}`,
  updateTournament: (id: string) => `${environment.apiUrl}/tournament/v1/${id}`,

  // Subscription
  createSubscription: `${environment.apiUrl}/subcription/v1/create`,
  updateSubscription: (userId: string, tournamentId: string) => `${environment.apiUrl}/subscription/v1/${userId}/${tournamentId}`,

  // User
  createUser: `${environment.apiUrl}/users/v1/create`

};