import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-xl font-semibold mb-4">Register (Customer)</h2>
    <form (ngSubmit)="onSubmit()">
      <label class="block mb-2">Full name
        <input class="w-full border p-2 rounded" [(ngModel)]="full_name" name="full_name" required />
      </label>
      <label class="block mb-2">Email
        <input class="w-full border p-2 rounded" [(ngModel)]="email" name="email" required />
      </label>
      <label class="block mb-2">Password
        <input type="password" class="w-full border p-2 rounded" [(ngModel)]="password" name="password" required />
      </label>
      <div>
        <button class="px-3 py-1 bg-green-600 text-white rounded" type="submit">Register</button>
      </div>
    </form>
    <pre class="mt-4 text-sm text-red-600" *ngIf="error">{{error}}</pre>
  </div>
  `
})
export class RegisterComponent {
  full_name = '';
  email = '';
  password = '';
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    const payload = { full_name: this.full_name, email: this.email, password: this.password, role: 'customer' };
    this.auth.register(payload).subscribe({
      next: (res) => this.router.navigate(['/auth/login']),
      error: (err) => this.error = (err?.error?.detail) || err.message || JSON.stringify(err)
    });
  }
}
