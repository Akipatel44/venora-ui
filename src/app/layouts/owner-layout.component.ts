import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-owner-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './owner-layout.component.html',
})
export class OwnerLayoutComponent {
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
