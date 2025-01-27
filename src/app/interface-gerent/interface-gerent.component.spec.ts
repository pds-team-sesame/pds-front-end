import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceGerentComponent } from './interface-gerent.component';

describe('InterfaceGerentComponent', () => {
  let component: InterfaceGerentComponent;
  let fixture: ComponentFixture<InterfaceGerentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterfaceGerentComponent]
    });
    fixture = TestBed.createComponent(InterfaceGerentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
