import { Component, EventEmitter, Input, Output, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface MenuItem {
  id: string;
  label: string;
  route: string;
  icon: string;
  isLocked?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isMobileMenuOpen = false;
  @Input() isCollapsed = false;
  @Output() mobileMenuToggle = new EventEmitter<void>();
  @Output() mobileMenuClose = new EventEmitter<void>();
  @Output() sidebarToggle = new EventEmitter<boolean>();

  shouldCollapse = signal(false);
  showTooltip = false;
  tooltipPosition = { x: 0, y: 0 };
  tooltipContentKey = '';
  tooltipLabel = '';
  isLockedTooltip = false;

  mainMenuItems: MenuItem[] = [];
  private isOwnerRoute = false;

  // Admin menu items
  private adminMenuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      route: '/admin',
      icon: 'icon-dashboard',
    },
    {
      id: 'halls',
      label: 'Hall Management',
      route: '/admin/halls',
      icon: 'icon-building',
    },
    {
      id: 'approvals',
      label: 'Hall Approvals',
      route: '/admin/approvals',
      icon: 'icon-check-circle',
    },
  ];

  // Owner menu items
  private ownerMenuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      route: '/owner',
      icon: 'icon-dashboard',
    },
    {
      id: 'my-halls',
      label: 'My Halls',
      route: '/owner/halls',
      icon: 'icon-building',
    },
  ];

  settingsMenuItems: MenuItem[] = [
    {
      id: 'settings',
      label: 'Settings',
      route: '/settings',
      icon: 'icon-settings',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Detect if current route is owner or admin
    this.isOwnerRoute = this.router.url.includes('/owner');
    this.setMenuItems();
  }

  setMenuItems() {
    if (this.isOwnerRoute) {
      this.mainMenuItems = this.ownerMenuItems;
    } else {
      this.mainMenuItems = this.adminMenuItems;
    }
  }

  toggleSidebar() {
    this.shouldCollapse.set(!this.shouldCollapse());
    this.sidebarToggle.emit(this.shouldCollapse());
  }

  toggleMobileMenu() {
    this.mobileMenuToggle.emit();
  }

  closeMobileMenu() {
    this.mobileMenuClose.emit();
  }

  onMenuItemClick(item: MenuItem, event: Event) {
    if (item.isLocked) {
      event.preventDefault();
    }
  }

  onMenuItemMouseEnter(event: Event, item: MenuItem) {
    if (this.shouldCollapse()) {
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      this.tooltipPosition = {
        x: rect.right + 12,
        y: rect.top + rect.height / 2 - 20,
      };
      this.tooltipLabel = item.label;
      this.isLockedTooltip = item.isLocked || false;
      this.showTooltip = true;
    }
  }

  onMenuItemMouseLeave() {
    setTimeout(() => {
      this.showTooltip = false;
    }, 100);
  }

  onTooltipMouseEnter() {
    this.showTooltip = true;
  }

  onTooltipMouseLeave() {
    this.showTooltip = false;
  }

  onSubscribeNowClick() {
    // Handle subscribe click
  }
}
