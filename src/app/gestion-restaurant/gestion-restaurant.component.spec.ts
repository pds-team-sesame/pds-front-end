import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRestaurantComponent } from './gestion-restaurant.component';

describe('GestionRestaurantComponent', () => {
  let component: GestionRestaurantComponent;
  let fixture: ComponentFixture<GestionRestaurantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionRestaurantComponent]
    });
    fixture = TestBed.createComponent(GestionRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
