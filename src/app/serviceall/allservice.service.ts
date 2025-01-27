import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllserviceService {
 private baseUrl = 'http://127.0.0.1:5000/api'; // URL de base de votre API Flask

  constructor(private http: HttpClient) {}


//------------------------ API Menu---------------------

addmenu(menuData: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/menu`, menuData);
}


  getallmenu(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAllmenus`);
  }

  getmenu(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getmenu/${id}`);
  }


  updatemenu(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifmenu/${id}`, userData);
  }

 deletemenu(id: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/supmenu/${id}`);
}


//------------------------ API Command---------------------
// Ajouter un command
addCommand(commandData: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/add-commande`, commandData);
}


  // Récupérer tous les retos
  getcommands(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAllcommandes`);
  }

  // Récupérer un command par id
  getcommandById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getcommande/${id}`);
  }

  // maj un command par ID
  updatecommand(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update-commande/${id}`, userData);
  }
 // Supprimer un command par ID
 deletecommand(id: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/delete-commande/${id}`);
}

//------------------------ API Table---------------------

addtable(tableData: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/add-table`, tableData);
}


  getalltable(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAlltables`);
  }

  gettable(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getable/${id}`);
  }


  updatable(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifiertable/${id}`, userData);
  }

 deletable(id: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/supptable/${id}`);
}

//------------------------ API Reservation---------------------

addreservation(reservationData: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/add-reservation`, reservationData);
}


  getallreservation(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAllreservations`);
  }

  getreservation(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getreservation/${id}`);
  }


  updareservation(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update-reservation/${id}`, userData);
  }

 delereservation(id: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/delete-reservation/${id}`);
}


//------------------------ API Livraison---------------------

addlivraison(livraisonData: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/add-livraison`, livraisonData);
}


  getalllivraison(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAlllivraisons`);
  }

  getlivraison(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getlivraison/${id}`);
  }


  updalivraison(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modiflivraison/${id}`, userData);
  }

 delelivraison(id: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/supplivraison/${id}`);
}

//------------------------ API Paiements---------------------

addpaiement(paiementData: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/add-paiement`, paiementData);
}


  getallpaiement(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAllpaiements`);
  }

  getpaiement(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getpaiement/${id}`);
  }


  updapaiement(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update-paiement/${id}`, userData);
  }

 delepaiement(id: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/delete-paiement/${id}`);
}

//------------------------ API Avis---------------------

addavis(avisData: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/add-avis`, avisData);
}


  getallavis(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAllaviss`);
  }

  getavis(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getavis/${id}`);
  }


  updaavis(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update-avis/${id}`, userData);
  }

 deleavis(id: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/delete-avis/${id}`);
}





}
