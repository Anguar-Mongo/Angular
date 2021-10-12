import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { producto } from 'src/app/interfaces/producto.interfaz';



@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

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
        link_producto_pagina:""
  } 

  productos:any;

  constructor(private http: HttpClient) { 
    this.http.get(`http://localhost:3000/api/producto/`).subscribe((data) =>{
      this.productos = data;
      console.log(this.productos)
    })

  }

  ngOnInit(): void {
  }

}
