import { TestBed } from '@angular/core/testing';

import { RouteAuthorizationGuard } from './route-authorization.guard';

describe('RouteAuthorizationGuard', () => {
  let guard: RouteAuthorizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RouteAuthorizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
