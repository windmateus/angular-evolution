import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesListComponent } from './games-list/games-list.component';
import { GamesFormComponent } from './games-form/games-form.component';

const routes: Routes = [
  { path: '', component: GamesListComponent },
  { path: 'new', component: GamesFormComponent },
  { path: 'edit/:id', component: GamesFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule { }
