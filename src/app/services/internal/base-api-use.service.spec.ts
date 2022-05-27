import { TestBed } from '@angular/core/testing';

import { BaseApiUseService } from './base-api-use.service';

describe('BaseApiUseService', () => {
  let service: BaseApiUseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseApiUseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
