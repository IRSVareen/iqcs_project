import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private Url = 'http://localhost:5000/api'
  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers(): Observable<any>{
    const headers = { Authorization: `Bearer ${sessionStorage.getItem('token')}` };
    return this.http.get<any>(`${this.Url}/users`)
  }

  addUsers(userData: {userName: string; password: string; role: string}): Observable<any>{
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem('managerToken')
    if(token){
      headers = headers.set('Authorization', `Bearer ${token}`)
    }else {
      console.warn('No manager token found in sessionStorage');
    }
     
    return this.http.post<any>(`${this.Url}/add`,userData,{headers})
  }
  loginUser(userData: { userName: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.Url}/login`, userData).pipe(
      tap((response) => {
        if (response.token && response.role && response.userName) {
          console.log(response.role);
  
          sessionStorage.setItem('userName', response.userName);
          sessionStorage.setItem('role',response.role)
          if (response.role === 'manager') {
            sessionStorage.setItem('managerToken', response.token);
          } else {
            sessionStorage.setItem('userToken', response.token);
          }
          this.authService.setLoginStatus(true);
        }
      })
    );
  }
  updateUser(_id: string, userData: {password: string}): Observable<any>{
    return this.http.put<any>(`${this.Url}/update/${_id}`,userData)
  }
}
