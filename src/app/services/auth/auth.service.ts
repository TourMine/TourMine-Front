import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'https://localhost:7143/auth';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).subscribe({
      next: (response) => {
        localStorage.setItem('currentUser', JSON.stringify(response));
  
        console.log('Token saved in localStorage:', localStorage.getItem('currentUser'));
        
        this.currentUserSubject.next(response); 
  
        this.router.navigate(['/tournaments/list']);
      },
      error: (error) => {
        console.error('Login error:', error);
      }
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/user/login']);
  }

  public getToken(): string | null {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser && currentUser.token ? currentUser.token : null;
  }

  isAuthenticated(): boolean {
    const user = this.currentUserValue;
    return user && user.token && this.isTokenValid(user.token);
  }

  private isTokenValid(token: string): boolean {
    const payload = this.decodeJwt(token);
    const now = Date.now() / 1000;
    return payload.exp > now;
  }

  private decodeJwt(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    const payload = parts[1];
    return JSON.parse(atob(payload));
  }

  public getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    const payload = this.decodeJwt(token);
    return payload?.role || null;
  }

  public getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    const payload = this.decodeJwt(token);
    return payload?.userId || null; 
  }

  public getUserEmail(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    const payload = this.decodeJwt(token);
    return payload?.unique_name || null; 
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }
}
