import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentStatusButtonComponent } from './tournament-status-button.component';

describe('TournamentStatusButtonComponent', () => {
  let component: TournamentStatusButtonComponent;
  let fixture: ComponentFixture<TournamentStatusButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentStatusButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentStatusButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
