import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HallDirectoryComponent } from './components/hall-directory/hall-directory.component';

const routes: Routes = [
  {
    path: '',
    component: HallDirectoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HallsRoutingModule { }
