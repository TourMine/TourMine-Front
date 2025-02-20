import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';  // Serviço que gerencia o token
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
      const token = this.authService.getToken(); // Use o método getToken()
  
      console.log('Token retrieved:', token); // Verifique o valor do token
  
      if (token) {
        return true; // Se o token estiver presente, o usuário está autenticado
      } else {
        this.router.navigate(['/login']); // Caso contrário, redireciona para o login
        return false;
      }
    }
  }
