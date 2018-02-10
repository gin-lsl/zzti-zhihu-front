import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskPreComponent } from './ask-pre.component';

describe('AskPreComponent', () => {
  let component: AskPreComponent;
  let fixture: ComponentFixture<AskPreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskPreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskPreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
