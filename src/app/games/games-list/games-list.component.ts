import { Component, OnInit, ViewChild } from '@angular/core';
import { Game } from '../game';
import { EMPTY, Observable, Subject, catchError } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GamesService } from '../games.service';

@Component({
    selector: 'app-games-list',
    imports: [CommonModule, RouterModule],
    templateUrl: './games-list.component.html',
    styleUrl: './games-list.component.scss'
})
export class GamesListComponent implements OnInit {

  games$!: Observable<Game[]>;
  selectedGame!: Game;

  err$ = new Subject<boolean>();
  errorMessage!: string;
  exclusionSuccess = false;

  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal', { static: true }) deleteModal: any;

  constructor(
    private service: GamesService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {
  }

  ngOnInit() {
    this.list();
  }

  list() {
    this.games$ = this.service.list()
      .pipe(
        catchError(err => {
          this.errorMessage = 'Error when listing';
          this.err$.next(true);
          return EMPTY;
        })
      );
  }

  edit(id?: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  delete(g: Game) {
    this.selectedGame = g;
    this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' })
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
          this.deleteModalRef.hide();
          this.exclusionSuccess = true;
        }
      }
      );
  }

  giveupDelete() {
    this.deleteModalRef.hide();
  }

}
