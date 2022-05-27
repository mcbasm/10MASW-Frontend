import { TestBed } from '@angular/core/testing';

import { ApiCallService } from './api-call.service';

describe('ApiCallServiceService', () => {
  let service: ApiCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
