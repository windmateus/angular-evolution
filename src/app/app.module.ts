import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ng2-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GamesListComponent } from './games/games-list/games-list.component';
import { GamesFormComponent } from './games/games-form/games-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent, GamesFormComponent, GamesListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, 
    CommonModule,
    HttpClientModule, 
    ModalModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '', pathMatch: 'full', redirectTo: 'games'
      }
      ,
      { path: 'games', component: GamesListComponent },
      { path: 'games/new', component: GamesFormComponent },
      { path: 'games/edit/:id', component: GamesFormComponent },
   ])    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
