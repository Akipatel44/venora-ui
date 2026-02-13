import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="!isAuthRoute" class="p-4 border-b border-gray-200 bg-white">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Venora</h1>
        <div class="flex gap-3">
          <a *ngIf="!isLogged" class="text-sm text-blue-600 hover:text-blue-700 font-medium" routerLink="/auth/login">Login</a>
          <button *ngIf="isLogged" (click)="logout()" class="text-sm px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Logout</button>
        </div>
      </div>
    </div>
    <router-outlet></router-outlet>
  `,
  standalone: false
})
export class AppComponent {
  isAuthRoute = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isAuthRoute = event.urlAfterRedirects.includes('/auth');
      });
  }

  get isLogged(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/auth/login']);
  }
}
