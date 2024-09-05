import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GamesListComponent } from './games/games-list/games-list.component';
import { GamesFormComponent } from './games/games-form/games-form.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GamesService } from './games/games.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'games' },
  { path: 'games', component: GamesListComponent },
  { path: 'games/new', component: GamesFormComponent },
  { path: 'games/edit/:id', component: GamesFormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    GamesFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    BrowserModule,
    HttpClientModule, 
    [RouterModule.forRoot(routes)],
  ],
  exports: [RouterModule],  
  providers: [GamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
