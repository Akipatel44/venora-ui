import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class="p-4">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Venora UI (Skeleton)</h1>
        <div class="flex gap-2">
          <a class="text-sm text-blue-600" routerLink="/auth/login">Login</a>
          <button *ngIf="isLogged" (click)="logout()" class="text-sm px-2 py-1 bg-red-600 text-white rounded">Logout</button>
        </div>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  standalone: false
})
export class AppComponent {
  constructor(private router: Router) {}

  get isLogged(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/auth/login']);
  }
}
