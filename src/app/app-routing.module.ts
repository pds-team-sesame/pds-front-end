import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InterfaceAdminComponent } from './interface-admin/interface-admin.component';
import { GestionUserComponent} from './gestion-user/gestion-user.component';
import { ModifieruserComponent } from './gestion-user/modifieruser/modifieruser.component';
import { GestionRestaurantComponent } from './gestion-restaurant/gestion-restaurant.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'interfaceadmin', component: InterfaceAdminComponent},
  { path: 'gereruser', component:GestionUserComponent},
  { path: 'modifieruser/:id', component: ModifieruserComponent },
      /* -------------------- path resot---------------------*/
  { path: 'gereresto', component:GestionRestaurantComponent},
  { path: 'modifieresto/:id', component:GestionRestaurantComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
