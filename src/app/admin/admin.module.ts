import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', loadComponent: () => import('./dashboard.component').then(m => m.AdminDashboardComponent), data: { roles: ['superadmin'] } }
    ])
  ]
})
export class AdminModule {}
