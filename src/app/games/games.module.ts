import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesListComponent } from './games-list/games-list.component';


@NgModule({
  imports: [
    CommonModule,
    GamesRoutingModule,
    GamesListComponent
  ]
})
export class GamesModule { }
