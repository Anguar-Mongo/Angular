import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { producto } from 'src/app/interfaces/producto.interfaz';
import Swal from 'sweetalert2'




@Component({
  selector: 'app-producto-admin',
  templateUrl: './producto-admin.component.html',
  styleUrls: ['./producto-admin.component.css']
})
export class ProductoAdminComponent implements OnInit {

  admin:boolean=false;
  p: number = 1;

  producto:producto = {
    marca:"",
    nombre:"",
    acabado:"",
    descripcion:"",
    fecha_compra:"",
    peso:"",
    precio:"",
    notas:"",
    status:"",
    cantidad:"",
    categoria:"",
    link_imagen:"",
    link_producto_pagina:"",
    _id:""
} 

productos:any;

categoriaSeleccionada:String="Todo";

editarBoton:boolean = false;
agregarBoton:boolean = false;



  constructor(private http: HttpClient) { 
    
  }

  ngOnInit(): void {
    if(localStorage.getItem('admin')=="true"){
      this.admin = true;
      this.http.get(`http://localhost:3000/api/producto/`).subscribe((data) =>{
        this.productos = data;
        console.log(this.productos)
        this.categoriaSeleccionada= "Todo";

    })
    }else{
      this.admin = false;
    }


    
  }
  base(){
    this.http.get(`http://localhost:3000/api/producto/categoria/Base`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
      this.categoriaSeleccionada= "Base";
    })
  }
  Blush(){
    this.http.get(`http://localhost:3000/api/producto/categoria/Blush`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
      this.categoriaSeleccionada= "Blush";

    })
  }
  Cancealer(){
    this.http.get(`http://localhost:3000/api/producto/categoria/Cancealer`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
      this.categoriaSeleccionada= "Cancealer";

    })
  }
  Highlight(){
    this.http.get(`http://localhost:3000/api/producto/categoria/Highlight`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
      this.categoriaSeleccionada= "Highlight";

    })
  }
  Labios(){
    this.http.get(`http://localhost:3000/api/producto/categoria/Labios`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
      this.categoriaSeleccionada= "Labios";

    })
  }
  Lapiz(){
    this.http.get(`http://localhost:3000/api/producto/categoria/Lapiz`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
      this.categoriaSeleccionada= "Lapiz";

    })
  }
  Powder(){
    this.http.get(`http://localhost:3000/api/producto/categoria/Powder`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
      this.categoriaSeleccionada= "Powder";

    })
  }

  Skincare(){
    this.http.get(`http://localhost:3000/api/producto/categoria/Skincare`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
      this.categoriaSeleccionada= "Skincare";

    })
  }
  Sombras(){
    this.http.get(`http://localhost:3000/api/producto/categoria/Sombras`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
      this.categoriaSeleccionada= "Sombras";

    })
  }

  EditarProducto(id:String){
    this.editarBoton= true
    this.http.get(`http://localhost:3000/api/producto/${id}`).subscribe((data:any) =>{
      this.producto= data;
      console.log(this.producto)
    })
  }

  regresar(){
    this.editarBoton= false
    this.ngOnInit();
   }

   editarBase(id:String){
     console.log(this.producto);
     this.http.put(`http://localhost:3000/api/producto/${id}`,this.producto).subscribe((data:any) =>{
       if(data.marca){
        Swal.fire(
          'Se modifico el producto',
          `El producto ${this.producto.nombre} se modifico de forma correcta`,
          'success'
        )
        this.ngOnInit();
       }else{
        Swal.fire(
          'Ocurrio un error',
          'Ocurrio un error',
          'question'
        )
       }
     });
     
   }

   agregar(){
     this.agregarBoton=true;
     this.editarBoton=false;
   }

   agregarBase(){
     this.producto._id="aux";
     this.http.post(`http://localhost:3000/api/producto/`,this.producto).subscribe((data:any) =>{
      if(data.marca){
        Swal.fire(
          'Se agrego el producto',
          `El producto ${this.producto.nombre} se agrego de forma correcta`,
          'success'
        )
        window.location.reload()
      }else{
        Swal.fire(
          'Ocurrio un error',
          'Ocurrio un error',
          'question'
        )
       }
     });
   }

   eliminar(id:String){
     this.http.delete(`http://localhost:3000/api/producto/${id}`).subscribe((data:any) =>{
      if(data.marca){
      Swal.fire(
        'Se elimino',
        `El producto ${data.nombre} se elimino de forma correcta`,
        'success'
      )
      window.location.reload()
    }else{
      Swal.fire(
        'Ocurrio un error',
        'Ocurrio un error',
        'question'
      )
     }
     })
   }

 


}
