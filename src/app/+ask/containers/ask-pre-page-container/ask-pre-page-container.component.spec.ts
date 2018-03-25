import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskPrePageContainerComponent } from './ask-pre-page-container.component';

describe('AskPrePageContainerComponent', () => {
  let component: AskPrePageContainerComponent;
  let fixture: ComponentFixture<AskPrePageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskPrePageContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskPrePageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
