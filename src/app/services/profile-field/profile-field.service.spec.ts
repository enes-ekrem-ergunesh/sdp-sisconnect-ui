import { TestBed } from '@angular/core/testing';

import { ProfileFieldService } from './profile-field.service';

describe('ProfileFieldService', () => {
  let service: ProfileFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
