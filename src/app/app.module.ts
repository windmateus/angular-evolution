import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';
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
    // AppRoutingModule,
    HttpClientModule, 
    ModalModule.forRoot(),
    RouterModule,
    RouterModule.forRoot([
      {
        path: '', pathMatch: 'full', redirectTo: 'games'
      }
      ,
      { path: 'games', component: GamesListComponent },
      { path: 'new', component: GamesFormComponent },
      { path: 'games/edit/:id', component: GamesFormComponent },
      // ,
      // { path: 'games', loadChildren: './games/games.module#GamesModule' },
   ])    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
