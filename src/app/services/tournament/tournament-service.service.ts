import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../core/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class TournamentServiceService {

  constructor(private http: HttpClient) { }

  getAllTournaments(): Observable<any[]> {
    return this.http.get<any[]>(API_ENDPOINTS.tournaments);
  }

  getTournamentById(id: string): Observable<any> {
    return this.http.get<any>(API_ENDPOINTS.tournamentById(id));
  }

  createTournament(tournamentData: any): Observable<any> {
    return this.http.post<any>(API_ENDPOINTS.createTournament, tournamentData);
  }

  updateTournament(id: string, tournamentData: any): Observable<any> {
    return this.http.put<any>(API_ENDPOINTS.updateTournament(id), tournamentData);
  }

  createSubscription(subscriptionData: any): Observable<any> {
    return this.http.post<any>(API_ENDPOINTS.createSubscription, subscriptionData);
  }

}
