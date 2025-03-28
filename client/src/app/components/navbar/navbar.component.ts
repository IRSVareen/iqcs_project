import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin = false;
  userName: string | null = '';
  isManager: boolean= false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((status) => {
      this.isLogin = status;
      this.updateNavbar()
    });
  }

  updateNavbar(): void {
    this.userName = sessionStorage.getItem('userName');
    this.isManager = sessionStorage.getItem('role') === 'manager';
  }

  logout() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('managerToken');
    sessionStorage.removeItem('role')
    this.authService.setLoginStatus(false);
    this.updateNavbar()
    this.router.navigate(['/login'])
  }
}
