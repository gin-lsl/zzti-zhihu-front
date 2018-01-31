import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskPageContainerComponent } from './ask-page-container.component';

describe('AskPageContainerComponent', () => {
  let component: AskPageContainerComponent;
  let fixture: ComponentFixture<AskPageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskPageContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
