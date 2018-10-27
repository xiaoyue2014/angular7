import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBackPwd2Component } from './find-back-pwd2.component';

describe('FindBackPwd2Component', () => {
  let component: FindBackPwd2Component;
  let fixture: ComponentFixture<FindBackPwd2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindBackPwd2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindBackPwd2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
