import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentServiceService {

  private apiUrl = "https://localhost:7051/tournament/v1/create"

  constructor(private http: HttpClient) { }

  createTournament(tournamentData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, tournamentData);
  }

  getAllTournaments(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7051/tournament/v1/all");
  }
}
