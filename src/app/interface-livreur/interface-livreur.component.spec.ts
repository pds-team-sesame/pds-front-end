import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceLivreurComponent } from './interface-livreur.component';

describe('InterfaceLivreurComponent', () => {
  let component: InterfaceLivreurComponent;
  let fixture: ComponentFixture<InterfaceLivreurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterfaceLivreurComponent]
    });
    fixture = TestBed.createComponent(InterfaceLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
