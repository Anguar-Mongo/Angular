import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { Input } from '@angular/core';
//Para hacer el ngmodel
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { MenuAdminComponent } from './componentes/menu-admin/menu-admin.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { RegisterComponent } from './componentes/register/register.component';
import { PrecioPipe } from './pipes/precio.pipe';
import { ProductoAdminComponent } from './componentes/producto-admin/producto-admin.component';
import { EmpleadoComponent } from './componentes/empleado/empleado.component';

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
    ProductoAdminComponent,
    EmpleadoComponent,
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
