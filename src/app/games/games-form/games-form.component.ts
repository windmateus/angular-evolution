import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
  submitted = false;
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
    this.submitted = true;    
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
    else {
      console.log(this.hasError('name'));
    }
  }

  hasError(field: string): ValidationErrors | null | undefined {
    return this.form.get(field)?.errors;
  }  

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
