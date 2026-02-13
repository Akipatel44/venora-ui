import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', loadComponent: () => import('./dashboard.component').then(m => m.OwnerDashboardComponent), data: { roles: ['subadmin'] } },
      { path: 'halls', loadChildren: () => import('./hall/hall.module').then(m => m.HallModule) }
    ])
  ]
})
export class OwnerModule {}
