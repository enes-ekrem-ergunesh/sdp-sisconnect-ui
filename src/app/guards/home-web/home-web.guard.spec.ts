import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { homeWebGuard } from './home-web.guard';

describe('homeWebGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => homeWebGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
