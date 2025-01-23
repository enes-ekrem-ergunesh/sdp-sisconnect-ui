import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { profileMobileGuard } from './profile-mobile.guard';

describe('profileMobileGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => profileMobileGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
