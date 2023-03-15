import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '', 
  redirectTo: 'users', 
  pathMatch: 'full'
}, {
  path: 'users',
  component: HomeComponent
}, {
  path: 'users/edit/:id',
  component: EditComponent
}, {
  path: 'users/create',
  component: CreateComponent
}, {
  path: 'users/details',
  component: DetailsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
