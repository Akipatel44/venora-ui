import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isMobileMenuOpen = false;
  @Output() mobileMenuToggle = new EventEmitter<void>();
  @Output() mobileMenuClose = new EventEmitter<void>();
  @Output() sidebarToggle = new EventEmitter<boolean>();

  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggle.emit(this.isCollapsed);
  }

  toggleMobileMenu() {
    this.mobileMenuToggle.emit();
  }

  closeMobileMenu() {
    this.mobileMenuClose.emit();
  }
}
