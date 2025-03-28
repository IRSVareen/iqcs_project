import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('managerToken');
    const role = sessionStorage.getItem('role')
    if (!token || !role) {
      this.router.navigate(['/login']); 
      return false;
    }

    try {
      
      if (token && role==='manager') {
        return true; 
      } else {
        this.router.navigate(['/unauthorized']); 
        return false;
      }
    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
