import { TestBed } from '@angular/core/testing';

import { LandingPageResolver } from './landing-page.resolver';

describe('LandingPageResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LandingPageResolver = TestBed.get(LandingPageResolver);
    expect(service).toBeTruthy();
  });
});
