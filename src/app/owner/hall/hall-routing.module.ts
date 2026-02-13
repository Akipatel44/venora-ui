import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HallListComponent } from './components/hall-list/hall-list.component';
import { HallCreateComponent } from './components/hall-create/hall-create.component';
import { HallEditComponent } from './components/hall-edit/hall-edit.component';
import { HallDetailComponent } from './components/hall-detail/hall-detail.component';

const routes: Routes = [
  { path: '', component: HallListComponent },
  { path: 'create', component: HallCreateComponent },
  { path: 'edit/:id', component: HallEditComponent },
  { path: ':id', component: HallDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HallRoutingModule {}
