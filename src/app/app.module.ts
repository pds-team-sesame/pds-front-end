import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InterfaceAdminComponent } from './interface-admin/interface-admin.component';
import { GestionUserComponent } from './gestion-user/gestion-user.component';
import { ModifieruserComponent } from './gestion-user/modifieruser/modifieruser.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GestionRestaurantComponent } from './gestion-restaurant/gestion-restaurant.component';
import { InterfaceGerentComponent } from './interface-gerent/interface-gerent.component';
import { GestionMenuComponent } from './gestion-menu/gestion-menu.component';
import { GestionCommandeComponent } from './gestion-commande/gestion-commande.component';
import { GestionReservationComponent } from './gestion-reservation/gestion-reservation.component';
import { GestionTableComponent } from './gestion-table/gestion-table.component';
import { GestionLivraisonComponent } from './gestion-livraison/gestion-livraison.component';
import { GestionPaiementsComponent } from './gestion-paiements/gestion-paiements.component';
import { GestionAvisComponent } from './gestion-avis/gestion-avis.component';
import { InterfaceLivreurComponent } from './interface-livreur/interface-livreur.component';
import { GestionLivraisonLivreurComponent } from './gestion-livraison-livreur/gestion-livraison-livreur.component';
import { GestionPaiementsLivreurComponent } from './gestion-paiements-livreur/gestion-paiements-livreur.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InterfaceAdminComponent,
    GestionUserComponent,
    ModifieruserComponent,
    GestionRestaurantComponent,
    InterfaceGerentComponent,
    GestionMenuComponent,
    GestionCommandeComponent,
    GestionReservationComponent,
    GestionTableComponent,
    GestionLivraisonComponent,
    GestionPaiementsComponent,
    GestionAvisComponent,
    InterfaceLivreurComponent,
    GestionLivraisonLivreurComponent,
    GestionPaiementsLivreurComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
