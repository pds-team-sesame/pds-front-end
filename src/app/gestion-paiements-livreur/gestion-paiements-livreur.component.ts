import { Component, OnInit } from '@angular/core';
import { AllserviceService } from '../serviceall/allservice.service';

interface Paiement {
  id: number;
  amount: number;
  status: string;
  date: string;
  commande_id: number;
}

@Component({
  selector: 'app-gestion-paiements-livreur',
  templateUrl: './gestion-paiements-livreur.component.html',
  styleUrls: ['./gestion-paiements-livreur.component.css']
})
export class GestionPaiementsLivreurComponent implements OnInit {

  paiements: Paiement[] = [];
  showAddEditPopup: boolean = false;
  showConfirmationPopup: boolean = false;
  isEditing: boolean = false;
  paiementIdToDelete: number | null = null;
  paiementForm: Paiement = {
    id: 0,
    amount: 0,
    status: '',
    date: '',
    commande_id: 0,
  };

  constructor(private paiementService: AllserviceService) {}

  ngOnInit(): void {
    this.loadPaiements();
  }

  // Charger tous les paiements
  loadPaiements(): void {
    this.paiementService.getallpaiement().subscribe(
      (data) => {
        this.paiements = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des paiements:', error);
      }
    );
  }

  // Ajouter un paiement
  addPaiement(): void {
    this.paiementService.addpaiement(this.paiementForm).subscribe(
      () => {
        console.log('Paiement ajouté avec succès');
        this.loadPaiements();
        this.closeAddEditPopup();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du paiement:', error);
      }
    );
  }

  // Mettre à jour un paiement
  updatePaiement(): void {
    this.paiementService.updapaiement(this.paiementForm.id, this.paiementForm).subscribe(
      () => {
        console.log('Paiement mis à jour avec succès');
        this.loadPaiements();
        this.closeAddEditPopup();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du paiement:', error);
      }
    );
  }

  // Ouvrir la popup pour ajouter un paiement
  openAddPopup(): void {
    this.isEditing = false;
    this.paiementForm = {
      id: 0,
      amount: 0,
      status: '',
      date: '',
      commande_id: 0,
    };
    this.showAddEditPopup = true;
  }

  // Ouvrir la popup pour éditer un paiement
  openEditPopup(paiement: Paiement): void {
    this.isEditing = true;
    this.paiementForm = { ...paiement };
    this.showAddEditPopup = true;
  }

  // Fermer la popup d'ajout/édition
  closeAddEditPopup(): void {
    this.showAddEditPopup = false;
  }

  // Confirmer la suppression d'un paiement
  confirmDelete(paiementId: number): void {
    this.showConfirmationPopup = true;
    this.paiementIdToDelete = paiementId;
  }

  // Supprimer un paiement
  deletePaiement(): void {
    if (this.paiementIdToDelete !== null) {
      this.paiementService.delepaiement(this.paiementIdToDelete).subscribe(
        () => {
          console.log('Paiement supprimé avec succès');
          this.loadPaiements();
          this.closeConfirmationPopup();
        },
        (error) => {
          console.error('Erreur lors de la suppression du paiement:', error);
        }
      );
    }
  }

  // Fermer la popup de confirmation de suppression
  closeConfirmationPopup(): void {
    this.showConfirmationPopup = false;
    this.paiementIdToDelete = null;
  }

  // Soumettre le formulaire (ajouter ou mettre à jour)
  onSubmit(): void {
    if (this.isEditing) {
      this.updatePaiement();
    } else {
      this.addPaiement();
    }
  }
}

