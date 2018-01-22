import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavContainerComponent } from './top-nav-container.component';

describe('TopNavContainerComponent', () => {
  let component: TopNavContainerComponent;
  let fixture: ComponentFixture<TopNavContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
