import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuestionBoxComponent } from './new-question-box.component';

describe('NewQuestionBoxComponent', () => {
  let component: NewQuestionBoxComponent;
  let fixture: ComponentFixture<NewQuestionBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQuestionBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuestionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
