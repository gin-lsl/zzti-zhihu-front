import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAcountPageComponent } from './active-acount-page.component';

describe('ActiveAcountPageComponent', () => {
  let component: ActiveAcountPageComponent;
  let fixture: ComponentFixture<ActiveAcountPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveAcountPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveAcountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
