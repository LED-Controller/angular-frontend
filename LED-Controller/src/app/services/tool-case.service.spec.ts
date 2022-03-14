import { TestBed } from '@angular/core/testing';

import { ToolCaseService } from './tool-case.service';

describe('ToolCaseService', () => {
  let service: ToolCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
