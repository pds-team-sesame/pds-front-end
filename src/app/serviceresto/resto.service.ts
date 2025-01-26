import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestoService {
  private baseUrl = 'http://127.0.0.1:5000/api'; // URL de base de votre API Flask

  constructor(private http: HttpClient) {}

// Ajouter un restaurant
addResto(restaurantData: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/restaurant`, restaurantData);
}


  // Récupérer tous les retos
  getRestos(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAllRestos`);
  }

  // Récupérer un resto par id
  getRestoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getRestos/${id}`);
  }

  // maj un resto par ID
  updateResto(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifier_resto/${id}`, userData);
  }
 // Supprimer un rsto par ID
 deleteResto(id: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/deleteresto/${id}`);
}
}
