import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCommentContainerComponent } from './question-comment-container.component';

describe('QuestionCommentContainerComponent', () => {
  let component: QuestionCommentContainerComponent;
  let fixture: ComponentFixture<QuestionCommentContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCommentContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCommentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
