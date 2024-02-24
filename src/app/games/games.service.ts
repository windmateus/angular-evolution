import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Game } from './game';
import { delay, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private readonly API = `${environment.API}games`;  

  constructor(private http: HttpClient) { 
    this.list();    
  }

  list() {
    return this.http.get<Game[]>(this.API)
      .pipe(
        delay(1500),
        tap(console.log)
      );    
  }

  /** take(1) unsubscribes */

  loadByID(id: number) {
    return this.http.get<Game>(`${this.API}/${id}`).pipe(take(1));
  }  

  private create(game: Game) {
    return this.http.post(this.API, game).pipe(take(1));
  }

  private update(game: Game) {
    return this.http.put(`${this.API}/${game.id}`, game).pipe(take(1));
  }

  save(game: Game) {
    if (game.id) {
      return this.update(game);
    } else {
      return this.create(game);
    }
  }

  delete(id: number) {
    return this.http.delete(`${this.API}/${id}`).pipe()
  }

}
