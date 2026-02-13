import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  full_name = '';
  email = '';
  password = ''
  role = 'customer';
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    const payload = { full_name: this.full_name, email: this.email, password: this.password, role: this.role };
    this.auth.register(payload).subscribe({
      next: (res) => this.router.navigate(['/auth/login']),
      error: (err) => this.error = (err?.error?.detail) || err.message || JSON.stringify(err)
    });
  }
}
