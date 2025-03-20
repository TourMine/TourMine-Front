import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../core/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  // constructor(private http: HttpClient) { }

  // getAllTournaments(): Observable<any[]> {
  //   return this.http.get<any[]>(API_ENDPOINTS.tournaments);

    
  // getTournamentById(id: string): Observable<any> {
  //   return this.http.get<any>(API_ENDPOINTS.tournamentById(id));
  // }

  // createTournament(tournamentData: any): Observable<any> {
  //   return this.http.post<any>(API_ENDPOINTS.createTournament, tournamentData);
  
  // }

  private readonly apiUrl = 'https://localhost:7051/tournament/v1/all';
  private readonly apiUrl2 = 'https://localhost:7051/tournament/v1/create';
  private readonly apiUrl3 = 'https://localhost:7051/tournament/v1';
  private readonly apiUrl4 = 'https://localhost:7051/subscription/v1/get-by-tournamentId/{tournamentId}';

  constructor(private http: HttpClient) { }

  getAllTournaments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  getTournamentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl3}/${id}`);
  }

  createTournament(tournamentData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl2, tournamentData);
  }

  updateTournament(id: string, tournamentData: any): Observable<any> {
    return this.http.put<any>(API_ENDPOINTS.updateTournament(id), tournamentData);
  }

  getTournamentSubscriptions(tournamentId: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl4.replace('{tournamentId}', tournamentId));
  }

}
