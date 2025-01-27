import { Component, OnInit } from '@angular/core';
import { AllserviceService } from '../serviceall/allservice.service';

interface Avis {
  id: number;
  rating: number;
  commentaire: string;
  status: string;
  date: string;
  command_id: number;
}

@Component({
  selector: 'app-gestion-avis',
  templateUrl: './gestion-avis.component.html',
  styleUrls: ['./gestion-avis.component.css']
})
export class GestionAvisComponent implements OnInit {

  avisList: Avis[] = [];
  showAddEditPopup: boolean = false;
  showConfirmationPopup: boolean = false;
  isEditing: boolean = false;
  avisIdToDelete: number | null = null;
  avisForm: Avis = {
    id: 0,
    rating: 0,
    commentaire: '',
    status: '',
    date: '',
    command_id: 0,
  };

  constructor(private avisService: AllserviceService) {}

  ngOnInit(): void {
    this.loadAvis();
  }

  // Charger tous les avis
  loadAvis(): void {
    this.avisService.getallavis().subscribe(
      (data) => {
        this.avisList = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des avis:', error);
      }
    );
  }

  // Ajouter un avis
  addAvis(): void {
    this.avisService.addavis(this.avisForm).subscribe(
      () => {
        console.log('Avis ajouté avec succès');
        this.loadAvis();
        this.closeAddEditPopup();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'avis:', error);
      }
    );
  }

  // Mettre à jour un avis
  updateAvis(): void {
    this.avisService.updaavis(this.avisForm.id, this.avisForm).subscribe(
      () => {
        console.log('Avis mis à jour avec succès');
        this.loadAvis();
        this.closeAddEditPopup();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'avis:', error);
      }
    );
  }

  // Ouvrir la popup pour ajouter un avis
  openAddPopup(): void {
    this.isEditing = false;
    this.avisForm = {
      id: 0,
      rating: 0,
      commentaire: '',
      status: '',
      date: '',
      command_id: 0,
    };
    this.showAddEditPopup = true;
  }

  // Ouvrir la popup pour éditer un avis
  openEditPopup(avis: Avis): void {
    this.isEditing = true;
    this.avisForm = { ...avis };
    this.showAddEditPopup = true;
  }

  // Fermer la popup d'ajout/édition
  closeAddEditPopup(): void {
    this.showAddEditPopup = false;
  }

  // Confirmer la suppression d'un avis
  confirmDelete(avisId: number): void {
    this.showConfirmationPopup = true;
    this.avisIdToDelete = avisId;
  }

  // Supprimer un avis
  deleteAvis(): void {
    if (this.avisIdToDelete !== null) {
      this.avisService.deleavis(this.avisIdToDelete).subscribe(
        () => {
          console.log('Avis supprimé avec succès');
          this.loadAvis();
          this.closeConfirmationPopup();
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'avis:', error);
        }
      );
    }
  }

  // Fermer la popup de confirmation de suppression
  closeConfirmationPopup(): void {
    this.showConfirmationPopup = false;
    this.avisIdToDelete = null;
  }

  // Soumettre le formulaire (ajouter ou mettre à jour)
  onSubmit(): void {
    if (this.isEditing) {
      this.updateAvis();
    } else {
      this.addAvis();
    }
  }
}
