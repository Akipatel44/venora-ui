import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {
  sidebarCollapsed = false;
  mobileMenuOpen = false;

  constructor(private router: Router) {}

  onSidebarToggle(collapsed: boolean) {
    this.sidebarCollapsed = collapsed;
  }

  onMobileMenuToggle() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onMobileMenuClose() {
    this.mobileMenuOpen = false;
  }

  onLogout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/auth/login']);
  }
}
