import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionLivraisonLivreurComponent } from './gestion-livraison-livreur.component';

describe('GestionLivraisonLivreurComponent', () => {
  let component: GestionLivraisonLivreurComponent;
  let fixture: ComponentFixture<GestionLivraisonLivreurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionLivraisonLivreurComponent]
    });
    fixture = TestBed.createComponent(GestionLivraisonLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
