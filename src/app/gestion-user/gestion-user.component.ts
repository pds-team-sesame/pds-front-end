import { Component, OnInit } from '@angular/core';
import { UserService } from '../serviceuser/user.service';

@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.css']
})
export class GestionUserComponent implements OnInit {
  users: any[] = [];  // Tableau pour stocker les utilisateurs
  showConfirmationPopup: boolean = false;  // État pour le pop-up de confirmation
  userIdToDelete: number | null = null;  // ID de l'utilisateur à supprimer

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();  // Charge les utilisateurs au démarrage
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        if (data.success) {
          this.users = data.users;  // Accède à 'users' dans la réponse
        } else {
          console.error('Erreur :', data.message);
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      }
    );
  }

  confirmDelete(userId: number): void {
    this.showConfirmationPopup = true;
    this.userIdToDelete = userId;  // Stocker l'ID de l'utilisateur à supprimer
  }

  deleteUser(): void {
    if (this.userIdToDelete !== null) {
      this.userService.deleteUser(this.userIdToDelete).subscribe(
        (response) => {
          console.log('Utilisateur supprimé avec succès', response);
          this.closePopup();
          this.loadUsers();  // Recharge la liste des utilisateurs après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        }
      );
    }
  }

  closePopup(): void {
    this.showConfirmationPopup = false;
    this.userIdToDelete = null;
  }
}
