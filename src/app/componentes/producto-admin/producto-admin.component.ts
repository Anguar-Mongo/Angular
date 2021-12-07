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

crearDescuento={
        nombre:"DESCUENTO",
        porcentaje:0,
        fecha_emision:new Date(this.hoy.getTime()),
        fecha_termino:new Date(this.hoy.getTime()+(30*this.DIA_EN_MILISEGUNDOS)),
        numero_usado:0,
        active:true,
        descripcion:"DESCUENTO",
        producto:"",
}

productos:any;
descuentos:any;
descuento:number=0;

categoriaSeleccionada:String="Todo";

editarBoton:boolean = false;
agregarBoton:boolean = false;



  constructor(private http: HttpClient) { 
    
  }

  ngOnInit(): void {
    this.descuento=0;
    if(localStorage.getItem('admin')=="true"){
      this.admin = true;
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
              element.notas= `DESCUENTO DE ${element2.porcentaje}% ` + element.notas + " Precio origial de "+  element.precio
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
    this.http.get(`http://localhost:3000/api/descuento/${id}`).subscribe((data2:any) =>{
      console.log(data2)
      if(data2.length>0){
        this.descuento= data2[0].porcentaje;
        console.log(this.descuento)
      }
      
    })
  }

  regresar(){
    this.editarBoton= false
    this.agregarBoton= false
    this.ngOnInit();
   }

   editarBase(id:String){
     this.crearDescuento.producto=id.toString();
     this.crearDescuento.porcentaje = this.descuento
     this.http.get(`http://localhost:3000/api/descuento/${id}`).subscribe((data:any) =>{
       if(data.length==0){ //el item no tiene descuento activo
          this.http.post(`http://localhost:3000/api/descuento/`,this.crearDescuento).subscribe((data2) =>{
            console.log(data2);
            
          })
       }else{ //si ya tiene un descuento se elimina el anterior y se pone el nuevo
         this.http.delete(`http://localhost:3000/api/descuento/${data[0]._id}`).subscribe((data2) =>{
           console.log(data2);
           this.http.post(`http://localhost:3000/api/descuento/`,this.crearDescuento).subscribe((data3) =>{
            console.log(data3);
            
          })
           
         })
       }
     })
     
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

   buscar(val:String){
     console.log(val);
     
    this.http.get(`http://localhost:3000/api/producto/buscador/${val}`).subscribe((data) =>{
      this.productos = data
      console.log(data);
      
    })
    
  }


}
