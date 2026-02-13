import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HallDirectoryComponent } from './components/hall-directory/hall-directory.component';
import { HallDetailComponent } from './components/hall-detail/hall-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HallDirectoryComponent
  },
  {
    path: ':id',
    component: HallDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HallsRoutingModule { }
