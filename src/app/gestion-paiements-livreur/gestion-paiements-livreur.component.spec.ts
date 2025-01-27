import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPaiementsLivreurComponent } from './gestion-paiements-livreur.component';

describe('GestionPaiementsLivreurComponent', () => {
  let component: GestionPaiementsLivreurComponent;
  let fixture: ComponentFixture<GestionPaiementsLivreurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionPaiementsLivreurComponent]
    });
    fixture = TestBed.createComponent(GestionPaiementsLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
