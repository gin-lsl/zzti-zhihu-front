import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionReplyItemComponent } from './question-reply-item.component';

describe('QuestionReplyItemComponent', () => {
  let component: QuestionReplyItemComponent;
  let fixture: ComponentFixture<QuestionReplyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionReplyItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionReplyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
