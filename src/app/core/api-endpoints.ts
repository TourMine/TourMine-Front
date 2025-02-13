import { environment } from '../../environments/environment.prod';

export const API_ENDPOINTS = {
  tournaments: `${environment.apiUrl}/tournament/v1/all`,
  tournamentById: (id: string) => `${environment.apiUrl}/tournament/v1/${id}`,
  createTournament: `${environment.apiUrl}/tournament/v1/create`,
  updateTournament: (id: string) => `${environment.apiUrl}/tournament/v1/${id}`,
  createUser: `${environment.apiUserUrl}/users/v1/create`
};