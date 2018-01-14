import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOnResultPageComponent } from './sign-on-result-page.component';

describe('SignOnResultPageComponent', () => {
  let component: SignOnResultPageComponent;
  let fixture: ComponentFixture<SignOnResultPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignOnResultPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignOnResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
