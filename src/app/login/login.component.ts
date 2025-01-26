import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
      (response) => {
        console.log('Réponse API:', response);

        // Vérification du rôle
        if (response.user.role === 'ADMIN') {
          //alert('Bienvenue, Administrateur!');
          this.router.navigate(['/interfaceadmin']); // Redirige vers l'interface admin
        }
        else {
          //alert('echoue');
          this.router.navigate(['/login']); // Redirige vers l'interface utilisateur
        }
      },
      (error) => {
        console.error('Erreur API:', error);
        alert('Nom d’utilisateur ou mot de passe incorrect.');

      }
    );
  }
}
