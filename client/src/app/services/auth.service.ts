import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginStatus = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.loginStatus.asObservable();

  constructor() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const managerToken = sessionStorage.getItem('managerToken');
    const userToken = sessionStorage.getItem('userToken');
    this.loginStatus.next(!!managerToken || !!userToken);
  }

  setLoginStatus(status: boolean) {
    this.loginStatus.next(status);
  }
}
