import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InterfaceAdminComponent } from './interface-admin/interface-admin.component';
import { GestionUserComponent} from './gestion-user/gestion-user.component';
import { ModifieruserComponent } from './gestion-user/modifieruser/modifieruser.component';
import { GestionRestaurantComponent } from './gestion-restaurant/gestion-restaurant.component';
import { InterfaceGerentComponent } from './interface-gerent/interface-gerent.component';
import { GestionMenuComponent } from './gestion-menu/gestion-menu.component';
import { GestionReservationComponent } from './gestion-reservation/gestion-reservation.component';
import { GestionTableComponent } from './gestion-table/gestion-table.component';
import { GestionCommandeComponent } from './gestion-commande/gestion-commande.component';
import { GestionLivraisonComponent } from './gestion-livraison/gestion-livraison.component';
import { GestionPaiementsComponent } from './gestion-paiements/gestion-paiements.component';
import { GestionAvisComponent } from './gestion-avis/gestion-avis.component';
import { InterfaceLivreurComponent } from './interface-livreur/interface-livreur.component';
import { GestionLivraisonLivreurComponent } from './gestion-livraison-livreur/gestion-livraison-livreur.component';
import { GestionPaiementsLivreurComponent } from './gestion-paiements-livreur/gestion-paiements-livreur.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'interfaceadmin', component: InterfaceAdminComponent},
  { path: 'gereruser', component:GestionUserComponent},
  { path: 'modifieruser/:id', component: ModifieruserComponent },
  { path: 'gereresto', component:GestionRestaurantComponent},
  { path: 'modifieresto/:id', component:GestionRestaurantComponent},
    /* -------------------- path Gérent interface---------------------*/
    { path: 'interfacegerent', component: InterfaceGerentComponent},
    { path: 'gerermenu', component:GestionMenuComponent},
    { path: 'gerereservation', component:GestionReservationComponent},
    { path: 'gerertable', component:GestionTableComponent},
    { path: 'gerercommande', component:GestionCommandeComponent},
    { path: 'gererlivraison', component: GestionLivraisonComponent},
    { path: 'gererpaiement', component:GestionPaiementsComponent},
    { path: 'gereravis', component:GestionAvisComponent},
     /* -------------------- path Livreur interface---------------------*/
    { path: 'interfacelivreur', component: InterfaceLivreurComponent},
    { path: 'livraison-livreur', component:GestionLivraisonLivreurComponent},
    { path: 'paiement-livreur', component:GestionPaiementsLivreurComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
