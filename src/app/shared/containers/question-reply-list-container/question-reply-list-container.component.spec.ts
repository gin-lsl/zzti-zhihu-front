import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionReplyListContainerComponent } from './question-reply-list-container.component';

describe('QuestionReplyListContainerComponent', () => {
  let component: QuestionReplyListContainerComponent;
  let fixture: ComponentFixture<QuestionReplyListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionReplyListContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionReplyListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
