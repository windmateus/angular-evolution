import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { Game } from './game';
import { delay, take, tap } from 'rxjs/operators';

@Injectable()
export class GamesService {
  private readonly API = `${environment.API}games`;

  constructor(private http: HttpClient) {
    this.list();
  }

  list() {
    return this.http.get<Game[]>(this.API)
      .pipe(
        delay(700),         // This is just to force a slower execution for us to see the "loading" indicator in screen
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
