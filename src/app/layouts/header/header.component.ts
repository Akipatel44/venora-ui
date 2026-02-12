import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() sidebarCollapsed = false;
  @Output() mobileMenuToggle = new EventEmitter<void>();
  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() languageChange = new EventEmitter<'en' | 'ar'>();
  @Output() logout = new EventEmitter<void>();

  unreadCount = 0;
  profileOpen = false;
  profileLastLogin = '';
  userCompanyName = 'Venora Ltd';
  userSadadId = '000000';

  toggleMobileMenu() {
    this.mobileMenuToggle.emit();
  }

  toggleMobileProfile() {
    this.profileOpen = !this.profileOpen;
  }

  toggleNotifications(event?: Event) {
    if (event) event.stopPropagation();
    this.unreadCount = 0;
  }

  toggleProfilePopover(event?: Event) {
    if (event) event.stopPropagation();
    this.profileOpen = !this.profileOpen;
  }

  openLogoutConfirm() {
    this.logout.emit();
  }
}
