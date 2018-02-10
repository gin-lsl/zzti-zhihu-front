import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotecellComponent } from './votecell.component';

describe('VotecellComponent', () => {
  let component: VotecellComponent;
  let fixture: ComponentFixture<VotecellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotecellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotecellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
