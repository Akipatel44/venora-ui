import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

function decodeJwt(token: string | null): any {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(atob(payload).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('access_token');
    const payload = decodeJwt(token);
    const role = payload?.role;
    const allowed: string[] = route.data['roles'] || [];
    if (!token || !payload) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    if (allowed.length > 0 && !allowed.includes(role)) {
      // unauthorized for this route
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
