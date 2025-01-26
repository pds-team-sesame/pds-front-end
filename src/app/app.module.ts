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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InterfaceAdminComponent,
    GestionUserComponent,
    ModifieruserComponent,
    GestionRestaurantComponent,


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
