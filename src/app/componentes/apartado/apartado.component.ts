import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { HttpClient } from '@angular/common/http';
import { producto } from 'src/app/interfaces/producto.interfaz';
import { Vector } from 'html2canvas/dist/types/render/vector';

@Component({
  selector: 'app-apartado',
  templateUrl: './apartado.component.html',
  styleUrls: ['./apartado.component.css']
})
export class ApartadoComponent implements OnInit {

  p: number = 1;
  DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
   hoy = new Date();
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

  productos:any=[];
  productos2:any=[];




  apartado={
    id_producto: "",
    fecha_limite:new Date(this.hoy.getTime()+(30*this.DIA_EN_MILISEGUNDOS)).toString(),
    monto_pagado:0,
    piezas:0,
    id_usuario:"",
  }



  descuentos:any;
  
  apartados:any

  admin:boolean = false;

  constructor(private http: HttpClient) { 
    
    if(localStorage.getItem('admin')=="true"){
      this.admin= true
    }else{
      this.admin= false;
    }

  }

  ngOnInit(): void {
    this.http.get(`http://localhost:3000/api/apartado/`).subscribe((data:any) =>{
      console.log(data);
      this.apartados = data
      
      if(data.length>0){
        data.forEach((element:any) => {
          this.http.get(`http://localhost:3000/api/producto/${element.id_producto}`).subscribe((data2:any) =>{
            console.log(data2);
            
            this.productos.push(data2)
          });

        });
      }
    });

    this.http.get(`http://localhost:3000/api/producto/`).subscribe((data) =>{
      //this.productos = data;
      console.log(this.productos)
      this.http.get(`http://localhost:3000/api/descuento/`).subscribe((data:any) =>{
        this.descuentos = data;
        console.log(this.descuentos);
        this.productos.forEach((element:any) => {
          
          this.descuentos.forEach((element2:any) => {
            //console.log(element2);
            if(element._id == element2.producto){
              element.notas= `DESCUENTO DE ${element2.porcentaje}% `+ element.notas + " Precio origial de "+  element.precio
              element.precio= element.precio.replace(/[$.]/g,'');
              console.log(element.precio);
              element.precio = element.precio/100
              element.precio = element.precio - ((element2.porcentaje/100)*element.precio)
              element.precio ="$"+element.precio.toString()
              console.log("HOLAAAA");
              
              
              
            }
            
          });
          
        });
     
      })

    })

    

  }

 Eliminar(id:String){
   this.http.delete(`http://localhost:3000/api/apartado/${id}`).subscribe((data:any)=>{
    Swal.fire(
      'Se eliminio el apartado',
      'Se eliminino el apartado de forma correcta',
      'success'
    )
    this.ngOnInit();
   })


 }


}
