import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Game } from '../game';
import { GamesService } from '../games.service';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { empty } from "rxjs/observable/empty";

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  games$: Observable<Game[]>;
  selectedGame: Game;

  err$ = new Subject<boolean>();
  errorMessage: string;
  exclusionSuccess = false;

  constructor(
    private service: GamesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.list();
  }

  list() {
    this.games$ = this.service.list()
      .pipe(
        catchError(err => {
          this.errorMessage = 'Error when loading games';
          this.err$.next(true);
          return empty();
        })
      );
  }

  edit(id?: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  delete(g: Game) {
    this.selectedGame = g;
    if (confirm('Are you sure?')) {
      this.confirmDelete();
    }
  }

  confirmDelete() {
    /* You don't need to unsubscribe from this method because we already have take(1) there in the service method that will terminate
    the method for us as soon as it goes to the server and comes back with the result */
    this.service.delete(this.selectedGame.id)
      .subscribe({
        next: () => {
          this.list();
        },
        error: () => {
          this.errorMessage = 'Error when deleting';
          this.err$.next(true);
        },
        complete: () => {
          this.exclusionSuccess = true;
        }
      }
      );
  }

}