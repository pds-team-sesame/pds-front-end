import { Component, OnInit } from '@angular/core';
import { AllserviceService } from '../serviceall/allservice.service';

interface Livraison {
  id: number;
  date: string;
  status: string;
  commande_id: number;
  livreur_id: number;
}
@Component({
  selector: 'app-gestion-livraison-livreur',
  templateUrl: './gestion-livraison-livreur.component.html',
  styleUrls: ['./gestion-livraison-livreur.component.css']
})
export class GestionLivraisonLivreurComponent implements OnInit {

  livraisons: Livraison[] = [];
  showAddEditPopup: boolean = false;
  showConfirmationPopup: boolean = false;
  isEditing: boolean = false;
  livraisonIdToDelete: number | null = null;
  livraisonForm: Livraison = {
    id: 0,
    date: '',
    status: '',
    commande_id: 0,
    livreur_id: 0,
  };

  constructor(private livraisonService: AllserviceService) {}

  ngOnInit(): void {
    this.loadLivraisons();
  }

  loadLivraisons(): void {
    this.livraisonService.getalllivraison().subscribe(
      (data) => {
        this.livraisons = data;
      },
      (error) => {
        console.error('Error loading deliveries:', error);
      }
    );
  }

  addLivraison(): void {
    this.livraisonService.addlivraison(this.livraisonForm).subscribe(
      () => {
        console.log('Delivery added successfully');
        this.loadLivraisons();
        this.closeAddEditPopup();
      },
      (error) => {
        console.error('Error adding delivery:', error);
      }
    );
  }

  updateLivraison(): void {
    this.livraisonService.updalivraison(this.livraisonForm.id, this.livraisonForm).subscribe(
      () => {
        console.log('Delivery updated successfully');
        this.loadLivraisons();
        this.closeAddEditPopup();
      },
      (error) => {
        console.error('Error updating delivery:', error);
      }
    );
  }

  openAddPopup(): void {
    this.isEditing = false;
    this.livraisonForm = {
      id: 0,
      date: '',
      status: '',
      commande_id: 0,
      livreur_id: 0,
    };
    this.showAddEditPopup = true;
  }

  openEditPopup(livraison: Livraison): void {
    this.isEditing = true;
    this.livraisonForm = { ...livraison };
    this.showAddEditPopup = true;
  }

  closeAddEditPopup(): void {
    this.showAddEditPopup = false;
  }

  confirmDelete(livraisonId: number): void {
    this.showConfirmationPopup = true;
    this.livraisonIdToDelete = livraisonId;
  }

  deleteLivraison(): void {
    if (this.livraisonIdToDelete !== null) {
      this.livraisonService.delelivraison(this.livraisonIdToDelete).subscribe(
        () => {
          console.log('Delivery deleted successfully');
          this.loadLivraisons();
          this.closeConfirmationPopup();
        },
        (error) => {
          console.error('Error deleting delivery:', error);
        }
      );
    }
  }

  closeConfirmationPopup(): void {
    this.showConfirmationPopup = false;
    this.livraisonIdToDelete = null;
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateLivraison();
    } else {
      this.addLivraison();
    }
  }
}
