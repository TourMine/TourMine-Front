import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    const role = this.authService.getUserRole() || '';

    console.log('Token:', token, 'Role:', role);

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // Obtendo as roles permitidas da configuração da rota
    const allowedRoles = route.data['roles'] as string[];

    if (allowedRoles && !allowedRoles.includes(role)) {
      console.warn('Acesso negado para a role:', role);
      this.router.navigate(['/tournaments/list']); // Redireciona para uma página permitida
      return false;
    }

    return true;
  }
}