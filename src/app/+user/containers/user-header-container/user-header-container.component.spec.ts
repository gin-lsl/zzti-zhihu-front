import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHeaderContainerComponent } from './user-header-container.component';

describe('UserHeaderContainerComponent', () => {
  let component: UserHeaderContainerComponent;
  let fixture: ComponentFixture<UserHeaderContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHeaderContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHeaderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
