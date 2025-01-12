import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/serviceuser/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifieruser',
  templateUrl: './modifieruser.component.html',
  styleUrls: ['./modifieruser.component.css']
})
export class ModifieruserComponent implements OnInit {
  userId!: number; // Utilisation du "!" pour éviter l'erreur
  username = '';
  email = '';
  password = '';
  role = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute  // Ajout de ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID depuis l'URL
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.loadUserData();
  }

  // Charger les données utilisateur existantes
  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe(
      (response) => {
        if (response.success) {
          this.username = response.user.username;
          this.email = response.user.email;
          this.role = response.user.role;
          this.password = response.user.password;

        } else {
          console.error('Utilisateur non trouvé :', response.message);
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des données utilisateur :', error);
      }
    );
  }

  // Envoyer les modifications
  onUpdate(): void {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
    };

    this.userService.updateUser(this.userId, user).subscribe(
      (response) => {
        console.log('Utilisateur modifié avec succès :', response);
        //alert('Utilisateur modifié avec succès !');
        this.router.navigate(['/gereruser']); // Redirection vers la liste
      },
      (error) => {
        console.error('Erreur lors de la modification de l\'utilisateur :', error);
      }
    );
  }
}
