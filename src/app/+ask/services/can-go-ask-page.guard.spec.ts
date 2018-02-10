import { TestBed, async, inject } from '@angular/core/testing';

import { CanGoAskPageGuard } from './can-go-ask-page.guard';

describe('CanGoAskPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanGoAskPageGuard]
    });
  });

  it('should ...', inject([CanGoAskPageGuard], (guard: CanGoAskPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
