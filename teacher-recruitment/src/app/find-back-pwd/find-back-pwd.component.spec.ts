import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBackPwdComponent } from './find-back-pwd.component';

describe('FindBackPwdComponent', () => {
  let component: FindBackPwdComponent;
  let fixture: ComponentFixture<FindBackPwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindBackPwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindBackPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
