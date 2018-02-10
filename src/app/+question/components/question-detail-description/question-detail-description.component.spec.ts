import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailDescriptionComponent } from './question-detail-description.component';

describe('QuestionDetailDescriptionComponent', () => {
  let component: QuestionDetailDescriptionComponent;
  let fixture: ComponentFixture<QuestionDetailDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDetailDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDetailDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
