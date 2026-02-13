import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HallApprovalListComponent } from './components/hall-approval-list/hall-approval-list.component';

const routes: Routes = [
  {
    path: '',
    component: HallApprovalListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HallApprovalRoutingModule { }
