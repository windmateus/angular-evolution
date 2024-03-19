import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesFormComponent } from './games-form.component';

describe('GamesFormComponent', () => {
  let component: GamesFormComponent;
  let fixture: ComponentFixture<GamesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamesFormComponent]
    });
    fixture = TestBed.createComponent(GamesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
