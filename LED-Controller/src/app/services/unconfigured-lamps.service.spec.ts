import { TestBed } from '@angular/core/testing';

import { UnconfiguredLampsService } from './unconfigured-lamps.service';

describe('UnconfiguredLampsService', () => {
  let service: UnconfiguredLampsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnconfiguredLampsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
