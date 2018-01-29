import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskPrePageComponent } from './ask-pre-page.component';

describe('AskPrePageComponent', () => {
  let component: AskPrePageComponent;
  let fixture: ComponentFixture<AskPrePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskPrePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskPrePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
