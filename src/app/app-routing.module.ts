import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { RegisterComponent } from './componentes/register/register.component';
import { ProductoAdminComponent } from './componentes/producto-admin/producto-admin.component';
import { EmpleadoComponent } from './componentes/empleado/empleado.component';
import { TransporteComponent } from './componentes/transporte/transporte.component';
import { CompraComponent } from './componentes/compra/compra.component';


const routes: Routes = [
  { path: 'productos', component: ProductoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'productoAD', component: ProductoAdminComponent },
  { path: 'empleado', component: EmpleadoComponent}, 
  { path: 'transporte', component:TransporteComponent},
  { path: 'compra', component:CompraComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
