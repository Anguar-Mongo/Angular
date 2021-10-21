import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { ProductoComponent } from './componentes/producto/producto.component';


const routes: Routes = [
  { path: 'productos', component: ProductoComponent },
  { path: 'carrito', component: CarritoComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
