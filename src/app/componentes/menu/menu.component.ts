import { Component, OnInit } from '@angular/core';
import { producto } from 'src/app/interfaces/producto.interfaz';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

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

  constructor() { }


  logout(){
    localStorage.clear();
    window.location.reload()

  }

  ngOnInit(): void {
  }

  Pagar(){
    //localStorage.setItem('carrito',JSON.stringify(this.carrito))
  }

}
