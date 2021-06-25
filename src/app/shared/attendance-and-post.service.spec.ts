import { TestBed } from '@angular/core/testing';

import { AttendanceAndPostService } from './attendance-and-post.service';

describe('AttendanceAndPostService', () => {
  let service: AttendanceAndPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceAndPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
