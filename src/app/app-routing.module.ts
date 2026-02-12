import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoAdminComponent } from './admin/demo-admin.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // demo protected admin route
  { path: 'admin/demo', component: DemoAdminComponent, canActivate: [AuthGuard] },
  // convenience redirects for role-specific login paths
  { path: 'admin/login', redirectTo: 'auth/login/admin' },
  { path: 'owner/login', redirectTo: 'auth/login/owner' },
  { path: 'login', redirectTo: 'auth/login' },
  // lazy-loaded module placeholders
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'owner', loadChildren: () => import('./owner/owner.module').then(m => m.OwnerModule) },
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: '', pathMatch: 'full', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
