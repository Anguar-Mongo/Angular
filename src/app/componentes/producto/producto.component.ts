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

  

  FlagCarrito:boolean = false;

  constructor(private http: HttpClient) { 

  }

  base(){
    this.http.get(`http://localhost:3000/api/producto/categoria/Base`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
    })
  }
  Blush(){
    this.http.get(`http://localhost:3000/api/producto/categoria/Blush`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
    })
  }
  Cancealer(){
    this.http.get(`http://localhost:3000/api/producto/categoria/Cancealer`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
    })
  }
  Highlight(){
    this.http.get(`http://localhost:3000/api/producto/categoria/Highlight`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
    })
  }
  Labios(){
    this.http.get(`http://localhost:3000/api/producto/categoria/Labios`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
    })
  }
  Lapiz(){
    this.http.get(`http://localhost:3000/api/producto/categoria/Lapiz`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
    })
  }
  Powder(){
    this.http.get(`http://localhost:3000/api/producto/categoria/Powder`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
    })
  }

  Skincare(){
    this.http.get(`http://localhost:3000/api/producto/categoria/Skincare`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
    })
  }
  Sombras(){
    this.http.get(`http://localhost:3000/api/producto/categoria/Sombras`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
    })
  }
 

  ngOnInit(): void {
    this.http.get(`http://localhost:3000/api/producto/`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
    })
  }

  AgregarCarrito(data:String){
    this.productos.forEach((element: producto) => {
      if(element._id==data){
        this.carrito.push(element)
      }
    });
    console.log(this.carrito);
    
    
  }

  Pagar(){
    localStorage.setItem('carrito',JSON.stringify(this.carrito))
  }

}
