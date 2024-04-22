import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesFormComponent } from './games-form.component';

describe('GamesFormComponent', () => {
  let component: GamesFormComponent;
  let fixture: ComponentFixture<GamesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GamesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
