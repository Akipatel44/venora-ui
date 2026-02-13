import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoAdminComponent } from './admin/demo-admin.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout.component';
import { OwnerLayoutComponent } from './layouts/owner-layout.component';
import { CustomerLayoutComponent } from './layouts/customer-layout.component';

const routes: Routes = [
  // demo protected admin route
  { path: 'admin/demo', component: DemoAdminComponent, canActivate: [AuthGuard] },
  // convenience redirects for role-specific login paths
  { path: 'admin/login', redirectTo: 'auth/login/admin' },
  { path: 'owner/login', redirectTo: 'auth/login/owner' },
  { path: 'login', redirectTo: 'auth/login' },
  // layout-wrapped dashboard routes
  { path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard], children: [
    { path: '', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
  ]},
  { path: 'superadmin', component: AdminLayoutComponent, canActivate: [AuthGuard], children: [
    { path: '', loadChildren: () => import('./superadmin/superadmin.module').then(m => m.SuperadminModule) }
  ]},
  { path: 'owner', component: OwnerLayoutComponent, canActivate: [AuthGuard], children: [
    { path: '', loadChildren: () => import('./owner/owner.module').then(m => m.OwnerModule) }
  ]},
  { path: 'customer', component: CustomerLayoutComponent, canActivate: [AuthGuard], children: [
    { path: '', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) }
  ]},
  { path: 'public', component: CustomerLayoutComponent, children: [
    { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) }
  ]},
  // lazy-loaded auth module
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', pathMatch: 'full', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
