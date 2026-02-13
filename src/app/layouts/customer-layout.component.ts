import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './customer-layout.component.html',
})
export class CustomerLayoutComponent {
  constructor(private router: Router) {}

  onLogout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/auth/login']);
  }
}
