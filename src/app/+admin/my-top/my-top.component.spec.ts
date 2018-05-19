import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTopComponent } from './my-top.component';

describe('MyTopComponent', () => {
  let component: MyTopComponent;
  let fixture: ComponentFixture<MyTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
