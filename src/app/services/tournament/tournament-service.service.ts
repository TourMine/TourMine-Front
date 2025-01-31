import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentServiceService {

  private apiUrl = "https://localhost:7051/tournament/v1/create"

  private baseUrl = "https://localhost:7051/tournament/v1";

  constructor(private http: HttpClient) { }

  createTournament(tournamentData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, tournamentData);
  }

  getAllTournaments(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7051/tournament/v1/all");
  }

  getTournamentById(id: string): Observable<any> {  // Método para buscar pelo ID
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateTournament(id: string, tournamentData: any): Observable<any> { // Alterado para string
    return this.http.put<any>(`${this.baseUrl}/${id}`, tournamentData);
  }

}
