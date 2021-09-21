import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PersonCreateComponent} from './components/person-create/person-create.component';
import {PersonListComponent} from './components/person-list/person-list.component';
import {PersonEditComponent} from './components/person-edit/person-edit.component';

const routes : Routes = [
  {path: '', pathMatch: 'full', redirectTo:'create-person'},
  {path: 'create-person', component: PersonCreateComponent},
  {path: 'persons-list', component: PersonListComponent},
  {path: 'edit-person/:id', component: PersonEditComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
