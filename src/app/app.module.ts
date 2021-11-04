import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { Input } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { MenuAdminComponent } from './componentes/menu-admin/menu-admin.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { RegisterComponent } from './componentes/register/register.component';
import { PrecioPipe } from './pipes/precio.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    MenuAdminComponent,
    ProductoComponent,
    CarritoComponent,
    RegisterComponent,
    PrecioPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    //Input
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
