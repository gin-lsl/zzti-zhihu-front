import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionReplyListComponent } from './question-reply-list.component';

describe('QuestionReplyListComponent', () => {
  let component: QuestionReplyListComponent;
  let fixture: ComponentFixture<QuestionReplyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionReplyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionReplyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
