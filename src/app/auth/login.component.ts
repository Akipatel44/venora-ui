import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-xl font-semibold mb-4">Login</h2>
    <form (ngSubmit)="onSubmit()">
      <label class="block mb-2">Email
        <input class="w-full border p-2 rounded" [(ngModel)]="email" name="email" required />
      </label>
      <label class="block mb-2">Password
        <input type="password" class="w-full border p-2 rounded" [(ngModel)]="password" name="password" required />
      </label>
      <div class="flex items-center gap-2">
        <button class="px-3 py-1 bg-blue-600 text-white rounded" type="submit">Login</button>
        <button type="button" class="px-3 py-1 bg-gray-200 rounded" (click)="goRegister()">Register (customer)</button>
      </div>
    </form>
    <pre class="mt-4 text-sm text-red-600" *ngIf="error">{{error}}</pre>
  </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;
  role: string | null = null;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(p => this.role = p.get('role'));
  }

  onSubmit() {
    const payload: any = { email: this.email, password: this.password };
    if (this.role) payload.role = this.role;
    this.auth.login(payload).subscribe({
      next: (res: any) => {
        const token = res.access_token || res.token || '';
        if (token) {
          localStorage.setItem('access_token', token);
          this.router.navigate(['/admin/demo']);
        } else {
          this.error = 'No token received';
        }
      },
      error: (err) => this.error = (err?.error?.detail) || err.message || JSON.stringify(err)
    });
  }

  goRegister() {
    this.router.navigate(['/auth/register']);
  }
}
