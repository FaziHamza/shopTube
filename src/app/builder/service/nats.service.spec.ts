import { TestBed } from '@angular/core/testing';

import { NATSService } from './nats.service';

describe('NATSService', () => {
  let service: NATSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NATSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
