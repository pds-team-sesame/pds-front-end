import { Component, OnInit } from '@angular/core';
import { RestoService } from '../serviceresto/resto.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-gestion-restaurant',
  templateUrl: './gestion-restaurant.component.html',
  styleUrls: ['./gestion-restaurant.component.css']
})
export class GestionRestaurantComponent implements OnInit {
  restos: any[] = [];
  showAddEditPopup: boolean = false; // Pour afficher le pop-up
  showConfirmationPopup: boolean = false; // Pour afficher le pop-up de confirmation
  isEditing: boolean = false; // Pour savoir si on est en mode ajout ou modification
  restoIdToDelete: number | null = null; // ID du restaurant à supprimer
  restaurantForm: any = {  // Formulaire pour les restaurants
    restaurant_name: '',
    address: '',
    phone_number: '',
    description: '',
    image_url: ''  // Ajouter le champ pour l'URL de l'image
  };
  selectedImage: File | null = null;  // Variable pour stocker l'image sélectionnée

  constructor(private restoService: RestoService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadResto();
  }

  // Charger les restaurants
  loadResto(): void {
    this.restoService.getRestos().subscribe(
      (data) => {
        this.restos = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des restaurants:', error);
      }
    );
  }

  // Gérer la sélection d'une image
  onImageChange(event: any): void {
    this.selectedImage = event.target.files[0]; // Stocker le fichier sélectionné
  }

  // Télécharger l'image sur le serveur et obtenir l'URL
  uploadImage(): Promise<string> {
    if (!this.selectedImage) {
      return Promise.reject('Aucune image sélectionnée');
    }

    const formData = new FormData();
    formData.append('image', this.selectedImage, this.selectedImage.name); // Ajouter l'image au FormData

    return this.http.post<{ imageUrl?: string }>('VOTRE_URL_DE_UPLOAD', formData, {
      headers: new HttpHeaders(),
    }).toPromise().then(response => {
      return response?.imageUrl || ''; // Vérification pour éviter l'erreur si response est undefined
    }).catch(error => {
      console.error('Erreur lors du téléchargement de l\'image:', error);
      return ''; // Si erreur, retourner une chaîne vide
    });
  }

  // Ajouter un restaurant
  addResto(): void {
    this.uploadImage().then(imageUrl => {
      this.restaurantForm.image_url = imageUrl;  // Ajouter l'URL de l'image dans le formulaire
      this.restoService.addResto(this.restaurantForm).subscribe(
        (response) => {
          console.log('Restaurant ajouté avec succès', response);
          this.loadResto();
          this.closeAddEditPopup();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du restaurant:', error);
        }
      );
    }).catch(error => {
      console.error('Erreur de téléchargement de l\'image:', error);
    });
  }

  // Modifier un restaurant
  updateResto(): void {
    this.uploadImage().then(imageUrl => {
      this.restaurantForm.image_url = imageUrl;  // Ajouter l'URL de l'image dans le formulaire
      this.restoService.updateResto(this.restaurantForm.id, this.restaurantForm).subscribe(
        (response) => {
          console.log('Restaurant modifié avec succès', response);
          this.loadResto();
          this.closeAddEditPopup();
        },
        (error) => {
          console.error('Erreur lors de la modification du restaurant:', error);
        }
      );
    }).catch(error => {
      console.error('Erreur de téléchargement de l\'image:', error);
    });
  }

  // Ouvrir le pop-up pour ajouter un restaurant
  openAddPopup(): void {
    this.isEditing = false;
    this.restaurantForm = {
      restaurant_name: '',
      address: '',
      phone_number: '',
      description: '',
      image_url: ''
    };
    this.showAddEditPopup = true;
  }

  // Ouvrir le pop-up pour modifier un restaurant
  openEditPopup(resto: any): void {
    this.isEditing = true;
    this.restaurantForm = { ...resto };  // Pré-remplir le formulaire avec les données existantes
    this.showAddEditPopup = true;
  }

  // Fermer le pop-up d'ajout ou de modification
  closeAddEditPopup(): void {
    this.showAddEditPopup = false;
  }

  // Confirmer la suppression d'un restaurant
  confirmDelete(restoId: number): void {
    this.showConfirmationPopup = true;
    this.restoIdToDelete = restoId;
  }

  // Supprimer un restaurant
  deleteResto(): void {
    if (this.restoIdToDelete !== null) {
      this.restoService.deleteResto(this.restoIdToDelete).subscribe(
        (response) => {
          console.log('Resto supprimé avec succès', response);
          this.closePopup();
          this.loadResto();
        },
        (error) => {
          console.error('Erreur lors de la suppression de Resto:', error);
        }
      );
    }
  }

  // Fermer le pop-up de confirmation
  closePopup(): void {
    this.showConfirmationPopup = false;
    this.restoIdToDelete = null;
  }

  // Méthode appelée lors du submit du formulaire
  onSubmit(): void {
    if (this.isEditing) {
      this.updateResto();  // Si on est en mode édition
    } else {
      this.addResto();  // Si on est en mode ajout
    }
  }
}
