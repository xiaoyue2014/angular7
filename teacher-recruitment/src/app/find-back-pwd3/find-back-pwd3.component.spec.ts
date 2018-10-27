import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBackPwd3Component } from './find-back-pwd3.component';

describe('FindBackPwd3Component', () => {
  let component: FindBackPwd3Component;
  let fixture: ComponentFixture<FindBackPwd3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindBackPwd3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindBackPwd3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
