import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {  Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin = false;
  userName: string | null = '';
  isManager: boolean= false;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

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
    this.updateNavbar();
    const snackBarConfig: MatSnackBarConfig = {
      duration: 3000,  
      horizontalPosition: 'center',  
      verticalPosition: "top", 
      panelClass: 'snackbar-style'
    };
    this.snackBar.open('Log Out successful!', 'Close', snackBarConfig);
    this.router.navigate(['/login'])
  }
}
