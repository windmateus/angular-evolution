import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map, switchMap } from 'rxjs';
import { GamesService } from '../games.service';
import { Game } from '../game';
import { CommonModule, Location } from "@angular/common";

@Component({
  selector: 'app-games-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './games-form.component.html',
  styleUrl: './games-form.component.scss'
})
export class GamesFormComponent {

  form!: FormGroup;
  mensagem!: string;
  classe: string = 'col-sm-12';

  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private service: GamesService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  updateForm(game: Game) {
    this.form.patchValue({
      id: game.id,
      name: game.name
    });
  }

  initForm(game: any) {
    this.form = this.fb.group({
      id: [game.id],
      name: [
        game.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
    });
  }  

  ngOnInit(): void {
    let newGame = {name: null};
    this.initForm(newGame);

    if (this.route.params) {
      this.route.params.
      pipe(
        map((params: any) => params['id']),
        switchMap(
          (id) => {
            if (id) {
              return this.service.loadByID(id);
            } else {
              return [];
            }
          }
        )
      )
      .subscribe(game => this.initForm(game));
    }
  }

  save() {
    if (this.form.valid) {
      let msgSuccesso: string = 'New game created!';
      let msgErro: string = 'Error when including';
      if (this.form.value.id) {
        msgSuccesso = 'Game saved!';
        msgErro = 'Error when saving';
      }
      this.subscription = this.service.save(this.form.value).subscribe( {
        next: () => {
          this.mensagem = msgSuccesso;
          this.classe += ' alert alert-success';
        },
        error: () => {
          this.mensagem = msgErro;
          this.classe += ' alert alert-danger';
        },
        complete: () => setTimeout(() => {
          this.location.back();
        }, 1500)
      }
      );
    }
  }

  cancel() {
    this.form.reset();
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
