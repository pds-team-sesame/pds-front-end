import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://127.0.0.1:5000/api'; // URL de base de votre API Flask

  constructor(private http: HttpClient) {}

  // Récupérer tous les utilisateurs
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/gereruser`);
  }

  // Récupérer un utilisateur par ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/utilisateur/${id}`);
  }

  // Mettre à jour un utilisateur par ID
  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifier/${id}`, userData);
  }
 // Supprimer un utilisateur par ID
 deleteUser(id: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/supprimer/${id}`);
}
}
