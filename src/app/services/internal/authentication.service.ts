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
  private name!: string;

  constructor(private http: HttpClient, private router: Router) {}

  saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  saveRole(role: string): void {
    localStorage.setItem('role', role);
    this.role = role;
  }

  saveName(name: string): void {
    localStorage.setItem('name', name);
    this.name = name;
  }

  getName(): string {
    if (!this.name) this.name = localStorage.getItem('name') || '';
    return this.name || '';
  }

  getRole(): string {
    if (!this.role) this.role = localStorage.getItem('role') || '';
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
    this.name = '';
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
