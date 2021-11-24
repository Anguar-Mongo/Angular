import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { producto } from 'src/app/interfaces/producto.interfaz';




@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
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

  carrito:Array<producto>=[{
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
}];


  categoriaSeleccionada:String="Todo";
  

  FlagCarrito:boolean = false;

  admin:boolean = false;

  constructor(private http: HttpClient) { 
    
    if(localStorage.getItem('admin')=="true"){
      this.admin= true
    }else{
      this.admin= false;
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
 

  ngOnInit(): void {
    this.http.get(`http://localhost:3000/api/producto/`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
      this.categoriaSeleccionada= "Todo";

    })
  }

  AgregarCarrito(data:String){
    this.productos.forEach((element: producto) => {
      if(element._id==data){
        this.carrito.push(element)

      }
    });
    localStorage.removeItem('carrito')

    localStorage.setItem('carrito',JSON.stringify(this.carrito))

    console.log(this.carrito);
    
    
  }

  Pagar(){
    localStorage.setItem('carrito',JSON.stringify(this.carrito))
  }

  buscar(val:String){
    console.log(val);
    
   this.http.get(`http://localhost:3000/api/producto/buscador/${val}`).subscribe((data) =>{
     this.productos = data
     console.log(data);
     
   })
   
 }

}
