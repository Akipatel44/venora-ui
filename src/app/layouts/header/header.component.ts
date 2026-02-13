import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() sidebarCollapsed = false;
  @Output() mobileMenuToggle = new EventEmitter<void>();
  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  // Notifications
  notificationsOpen = signal(false);
  notificationsLoading = false;
  activeTab = 'recent';
  unreadCount = 0;
  filteredNotifications: any[] = [];
  dateFilterControl: any = null;
  
  // Profile
  profileOpen = signal(false);
  mobileProfileOpen = false;
  profileLastLogin = new Date();
  userCompanyName = 'Venora Ltd';
  userInitials = 'VL';
  
  // Language
  currentLanguage = 'en';

  toggleMobileMenu() {
    this.mobileMenuToggle.emit();
  }

  toggleMobileProfile() {
    this.mobileProfileOpen = !this.mobileProfileOpen;
  }

  toggleNotifications(event?: Event) {
    if (event) event.stopPropagation();
    this.notificationsOpen.set(!this.notificationsOpen());
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  markAllAsRead() {
    this.unreadCount = 0;
  }

  viewAllNotifications() {
    this.notificationsOpen.set(false);
  }

  onNotificationClicked(notification: any, event?: Event) {
    if (event) event.stopPropagation();
  }

  handleNotificationAction(notification: any, action: any) {
    // Handle notification action
  }

  trackByNotification(index: number, notification: any) {
    return notification.id || index;
  }

  toggleProfilePopover(event?: Event) {
    if (event) event.stopPropagation();
    this.profileOpen.set(!this.profileOpen());
  }

  openLogoutConfirm() {
    this.logout.emit();
  }

  changeLanguage(lang: string) {
    this.currentLanguage = lang;
  }

  getModuleOptions() {
    return [
      { label: 'Event Management', value: 'events' },
      { label: 'Dashboard', value: 'dashboard' }
    ];
  }
}
