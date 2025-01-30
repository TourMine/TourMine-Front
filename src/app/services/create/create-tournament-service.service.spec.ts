import { TestBed } from '@angular/core/testing';

import { CreateTournamentServiceService } from './create-tournament-service.service';

describe('CreateTournamentServiceService', () => {
  let service: CreateTournamentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTournamentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
