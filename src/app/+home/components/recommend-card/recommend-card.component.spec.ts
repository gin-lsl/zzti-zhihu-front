import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendCardComponent } from './recommend-card.component';

describe('RecommendCardComponent', () => {
  let component: RecommendCardComponent;
  let fixture: ComponentFixture<RecommendCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
