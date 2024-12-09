import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tabsMobileGuard } from './tabs-mobile.guard';

describe('tabsMobileGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tabsMobileGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
