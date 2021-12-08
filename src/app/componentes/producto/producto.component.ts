import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { producto } from 'src/app/interfaces/producto.interfaz';
import Swal from 'sweetalert2'





@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
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


  apartado={
    id_producto: "",
    fecha_limite:new Date(this.hoy.getTime()+(30*this.DIA_EN_MILISEGUNDOS)).toString(),
    monto_pagado:0,
    piezas:0,
    id_usuario:"",
  }


  categoriaSeleccionada:String="Todo";

  descuentos:any;
  

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

 Apartar(id:String){
   var id_usuario = localStorage.getItem('id');
   if(id_usuario)
    this.apartado.id_usuario = id_usuario;
   this.apartado.id_producto=id.toString();
   this.apartado.monto_pagado=0;
   this.apartado.piezas=1;

   this.http.post(`http://localhost:3000/api/apartado`,this.apartado).subscribe((data:any)=>{
    Swal.fire(
      'Se aparto correctamente',
      'Se aparto correctamente, se te cobrara dentro de 30 dias',
      'success'
    )
   })


 }

}
