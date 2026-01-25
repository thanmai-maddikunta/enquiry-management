import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private isLoggedIn = signal<boolean>(false);
  private userName = signal<string>('');

  private router = inject(Router);

  // Getters - return readonly signals
  getIsLoggedIn() {
    return this.isLoggedIn.asReadonly();
  }

  getUserName() {
    return this.userName.asReadonly();
  }
  
  // Setters - update private signals
  setIsLoggedIn(value: boolean): void {
    this.isLoggedIn.set(value);
  }

  setUserName(value: string): void {
    this.userName.set(value);
  }

  login(username: string): void {
    this.setUserName(username);
    this.setIsLoggedIn(true);
  }

  logout(): void {
    this.setUserName('');
    this.setIsLoggedIn(false);
    this.router.navigate(['/home']);
  }
}
