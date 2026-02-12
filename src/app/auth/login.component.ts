import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
        const role = res.role || this.role || null;
        if (token) {
          localStorage.setItem('access_token', token);
          // redirect according to role
          if (role === 'superadmin') this.router.navigate(['/admin']);
          else if (role === 'subadmin') this.router.navigate(['/owner']);
          else if (role === 'customer') this.router.navigate(['/customer']);
          else this.router.navigate(['/']);
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
