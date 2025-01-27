import { Component } from '@angular/core';
import { AllserviceService } from '../serviceall/allservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Menu {
  id: number;
  name: string;
  price: string;
  restaurant_name: string;
  description_plat: string;
  image_url: string;
}

@Component({
  selector: 'app-gestion-menu',
  templateUrl: './gestion-menu.component.html',
  styleUrls: ['./gestion-menu.component.css']
})
export class GestionMenuComponent {
  menus: Menu[] = [];  // Spécifier que menus est un tableau de Menu
  showAddEditPopup: boolean = false;
  showConfirmationPopup: boolean = false;
  isEditing: boolean = false;
  menuIdToDelete: number | null = null;
  menuForm: any = {
    name: '',
    price: '',
    restaurant_name: '',
    description_plat: '',
    image_url: ''
  };
  selectedImage: File | null = null;

  constructor(private menuService: AllserviceService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadmenu();
  }

  // Charger les menus avec les données du restaurant
  loadmenu(): void {
    this.menuService.getallmenu().subscribe(
      (data) => {
        this.menus = data.map((menu: Menu) => ({
          ...menu,
          restaurant_name: menu.restaurant_name, // Assurez-vous que le nom du restaurant est bien présent
        }));
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
  addmenu(): void {
    this.uploadImage().then(imageUrl => {
      this.menuForm.image_url = imageUrl;  // Ajouter l'URL de l'image dans le formulaire
      this.menuService.addmenu(this.menuForm).subscribe(
        (response) => {
          console.log('Restaurant ajouté avec succès', response);
          this.loadmenu();
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
  updatemenu(): void {
    this.uploadImage().then(imageUrl => {
      this.menuForm.image_url = imageUrl;  // Ajouter l'URL de l'image dans le formulaire
      this.menuService.updatemenu(this.menuForm.id, this.menuForm).subscribe(
        (response) => {
          console.log('Menu modifié avec succès', response);
          this.loadmenu();
          this.closeAddEditPopup();
        },
        (error) => {
          console.error('Erreur lors de la modification du menu:', error);
        }
      );
    }).catch(error => {
      console.error('Erreur de téléchargement de l\'image:', error);
    });
  }

  // Ouvrir le pop-up pour ajouter un restaurant
  openAddPopup(): void {
    this.isEditing = false;
    this.menuForm = {
      name: '',
      price: '',
      restaurant_id: '',
      description_plat: '',
      image_url: ''
    };
    this.showAddEditPopup = true;
  }

  // Ouvrir le pop-up pour modifier un restaurant
  openEditPopup(menu: Menu): void {
    this.isEditing = true;
    this.menuForm = { ...menu };  // Pré-remplir le formulaire avec les données existantes
    this.showAddEditPopup = true;
  }

  // Fermer le pop-up d'ajout ou de modification
  closeAddEditPopup(): void {
    this.showAddEditPopup = false;
  }

  // Confirmer la suppression d'un restaurant
  confirmDelete(menuId: number): void {
    this.showConfirmationPopup = true;
    this.menuIdToDelete = menuId;
  }

  // Supprimer un restaurant
  deletemenu(): void {
    if (this.menuIdToDelete !== null) {
      this.menuService.deletemenu(this.menuIdToDelete).subscribe(
        (response) => {
          console.log('Menu supprimé avec succès', response);
          this.closePopup();
          this.loadmenu();
        },
        (error) => {
          console.error('Erreur lors de la suppression du menu:', error);
        }
      );
    }
  }

  // Fermer le pop-up de confirmation
  closePopup(): void {
    this.showConfirmationPopup = false;
    this.menuIdToDelete = null;
  }

  // Méthode appelée lors du submit du formulaire
  onSubmit(): void {
    if (this.isEditing) {
      this.updatemenu();  // Si on est en mode édition
    } else {
      this.addmenu();  // Si on est en mode ajout
    }
  }
}
