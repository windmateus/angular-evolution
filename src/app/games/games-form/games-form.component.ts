import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GamesService } from '../games.service';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../game';
import { map, switchMap } from 'rxjs/operators';
import { CommonModule, Location } from "@angular/common";


@Component({
  selector: 'app-games-form',
  templateUrl: './games-form.component.html',
  styleUrls: ['./games-form.component.css']
})
export class GamesFormComponent implements OnInit {

  form!: FormGroup;
  message!: string;
  class: string = 'col-sm-12';

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
      let msgSuccess: string = 'New game created!';
      let msgError: string = 'Error when including';
      if (this.form.value.id) {
        msgSuccess = 'Game saved!';
        msgError = 'Error when saving';
      }
      this.subscription = this.service.save(this.form.value).subscribe( {
        next: () => {
          this.message = msgSuccess;
          this.class += ' alert alert-success';
        },
        error: () => {
          this.message = msgError;
          this.class += ' alert alert-danger';
        },
        complete: () => setTimeout(() => {
          this.location.back();
        }, 750)   // This is just to force a slower execution for us to see the success message in the screen
      }
      );
    }
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
