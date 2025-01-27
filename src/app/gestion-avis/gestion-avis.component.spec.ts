import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAvisComponent } from './gestion-avis.component';

describe('GestionAvisComponent', () => {
  let component: GestionAvisComponent;
  let fixture: ComponentFixture<GestionAvisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionAvisComponent]
    });
    fixture = TestBed.createComponent(GestionAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
