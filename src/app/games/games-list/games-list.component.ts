import { Component, OnInit, ViewChild } from '@angular/core';
import { Game } from '../game';
import { EMPTY, Observable, Subject, catchError } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-games-list',
  standalone: true,
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

  plataformas$!: Observable<Game[]>;
  sucessoExclusao: any;
  erro$ = new Subject<boolean>();

  constructor(
    private service: GamesService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService    
  ) {
    console.log('construtor');    
  }

  ngOnInit() {
    this.list();
  }

  list() {
    this.games$ = this.service.list()
    .pipe(
      catchError(erro => {
        console.error(erro);
        this.errorMessage = 'Error when loading games';
        this.erro$.next(true);
        return EMPTY;
      })
    );
  }

  edit(id?: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  delete(g: Game) {
    console.log('excluir', g);
    this.selectedGame = g;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'})
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
        this.erro$.next(true);
      },
      complete: () => {
        this.deleteModalRef.hide();
        this.sucessoExclusao = true;
      }
    }
    );
  }

  giveupDelete() {
    this.deleteModalRef.hide();
  }

    
}
