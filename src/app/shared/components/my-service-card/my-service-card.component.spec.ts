import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyServiceCardComponent } from './my-service-card.component';

describe('MyServiceCardComponent', () => {
  let component: MyServiceCardComponent;
  let fixture: ComponentFixture<MyServiceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyServiceCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyServiceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
