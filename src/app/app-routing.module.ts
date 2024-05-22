import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'games'
  },
  { path: 'games', loadChildren: './games/games.module#GamesModule' },
  // {
  //   path: 'games', loadChildren: () => import('./games/games.module').then(m => m.GamesModule)
  // }
];

@NgModule({
  imports: [
    // CommonModule,
    // RouterModule.forRoot(routes)
  ],
  // exports: [
  //   RouterModule
  // ]
})
export class AppRoutingModule { }
