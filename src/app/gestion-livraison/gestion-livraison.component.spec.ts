import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionLivraisonComponent } from './gestion-livraison.component';

describe('GestionLivraisonComponent', () => {
  let component: GestionLivraisonComponent;
  let fixture: ComponentFixture<GestionLivraisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionLivraisonComponent]
    });
    fixture = TestBed.createComponent(GestionLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
