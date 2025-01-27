// gestion-reservation.component.ts
import { Component } from '@angular/core';
import { AllserviceService } from '../serviceall/allservice.service';
import { HttpClient } from '@angular/common/http';

interface Reservation {
  id: number;
  date: string;
  num_guests: string;
  client_id: string;
  restaurant_id: string;
  table_id: string;
}

@Component({
  selector: 'app-gestion-reservation',
  templateUrl: './gestion-reservation.component.html',
  styleUrls: ['./gestion-reservation.component.css']
})
export class GestionReservationComponent {
  reservations: Reservation[] = [];
  showAddEditPopup: boolean = false;
  showConfirmationPopup: boolean = false;
  isEditing: boolean = false;
  resIdToDelete: number | null = null;
  resForm: Partial<Reservation> = {
    id: undefined,
    date: '',
    num_guests: '',
    client_id: '',
    restaurant_id: '',
    table_id: '',
  };

  constructor(private resService: AllserviceService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.resService.getallreservation().subscribe(
      (data) => {
        this.reservations = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des réservations :', error);
      }
    );
  }

  addReservation(): void {
    this.resService.addreservation(this.resForm).subscribe(
      (response) => {
        console.log('Réservation ajoutée avec succès', response);
        this.loadReservations();
        this.closeAddEditPopup();
      },
      (error) => {
        console.error("Erreur lors de l'ajout de la réservation :", error);
      }
    );
  }

  updateReservation(): void {
    if (this.resForm.id) {
      this.resService.updareservation(this.resForm.id, this.resForm).subscribe(
        (response) => {
          console.log('Réservation modifiée avec succès', response);
          this.loadReservations();
          this.closeAddEditPopup();
        },
        (error) => {
          console.error("Erreur lors de la modification de la réservation :", error);
        }
      );
    }
  }

  openAddPopup(): void {
    this.isEditing = false;
    this.resForm = {
      id: undefined,
      date: '',
      num_guests: '',
      client_id: '',
      restaurant_id: '',
      table_id: '',
    };
    this.showAddEditPopup = true;
  }

  openEditPopup(reservation: Reservation): void {
    this.isEditing = true;
    this.resForm = { ...reservation };
    this.showAddEditPopup = true;
  }

  closeAddEditPopup(): void {
    this.showAddEditPopup = false;
  }

  confirmDelete(reservationId: number): void {
    this.showConfirmationPopup = true;
    this.resIdToDelete = reservationId;
  }

  deleteReservation(): void {
    if (this.resIdToDelete !== null) {
      this.resService.delereservation(this.resIdToDelete).subscribe(
        (response) => {
          console.log('Réservation supprimée avec succès', response);
          this.closePopup();
          this.loadReservations();
        },
        (error) => {
          console.error('Erreur lors de la suppression de la réservation :', error);
        }
      );
    }
  }

  closePopup(): void {
    this.showConfirmationPopup = false;
    this.resIdToDelete = null;
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateReservation();
    } else {
      this.addReservation();
    }
  }
}

