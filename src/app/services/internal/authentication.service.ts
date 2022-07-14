import { UserDetails } from './../../types/types';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private token!: string;
  private role!: string;

  constructor(private http: HttpClient, private router: Router) {}

  saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  saveRole(role: string): void {
    this.role = role;
  }

  getRole(): string {
    return this.role || '';
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token') || '';
    }
    return this.token;
  }

  logout(): void {
    this.token = '';
    this.role = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/login');
  }

  getUserDetails(): UserDetails | null {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


}