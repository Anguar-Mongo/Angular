import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import { proveedor } from 'src/app/interfaces/proveedor.interfaz';
import { provee } from 'src/app/interfaces/provee.interfaz';
import { producto } from 'src/app/interfaces/producto.interfaz';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  admin:boolean=false;
  p: number = 1;

  proveedor:proveedor={
    nombre: "",
    RFC:"",
    telefono:"",
    correo:"",
    domicilio: {
        calle:"",
        colonia:"",
        estado:"",
        municipio:"",
        numero_exterior:"",
        numero_interior:"",
    },
    productos:[""],
    _id:""
  }

  provee:provee={
    proveedor:"",
    id_producto:"",
    cantidad:0,
  }

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

  proveedors:any
  productos:any
  AgregarProducto:String="";


  editarBoton:boolean = false;
  agregarBoton:boolean = false;
  agregarProductoBoton:boolean = false;



  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.editarBoton= false;
    this.agregarBoton= false;
    this.agregarProductoBoton = false;

    this.proveedor={
      nombre: "",
      RFC:"",
      telefono:"",
      correo:"",
      domicilio: {
          calle:"",
          colonia:"",
          estado:"",
          municipio:"",
          numero_exterior:"",
          numero_interior:"",
      },
      productos:[""],
      _id:""
    }
    this.producto={
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
    this.provee={
      proveedor:"",
      id_producto:"",
      cantidad:0,
    }
    if(localStorage.getItem('admin')=="true"){
      this.admin=true;
      this.http.get(`http://localhost:3000/api/proveedor/`).subscribe((data) =>{
        this.proveedors = data;
      })
    }
  }


  Editarproveedor(id:String){
    this.editarBoton=true;
    this.agregarBoton=false;
    this.http.get(`http://localhost:3000/api/proveedor/${id}`).subscribe((data:any) =>{
        this.proveedor = data;
    })
    this.http.get(`http://localhost:3000/api/producto/`).subscribe((data:any) =>{
        this.productos = data;
    })
    

  }
  
  editarBase(){
    console.log(this.AgregarProducto);
    this.proveedor.productos.push(this.AgregarProducto)
    console.log(this.proveedor);
    
    
    this.http.put(`http://localhost:3000/api/proveedor/${this.proveedor._id}`,this.proveedor).subscribe((data:any) =>{
      if(data.nombre){
        Swal.fire(
          'Se edito el proveedor',
          `El proveedor ${this.proveedor.nombre} se edito de forma correcta`,
          'success'
        )
        this.editarBoton= false;
        this.ngOnInit();
      }else{
        Swal.fire(
          'Ocurrio un error',
          'Ocurrio un error',
          'question'
        )
       }
    })
  }

  eliminar(id:String){
    this.http.delete(`http://localhost:3000/api/proveedor/${id}`).subscribe((data:any)=>{
      if(data.nombre){
        Swal.fire(
          'Se elimino',
          `El proveedor ${data.nombre} se elimino de forma correcta`,
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
    })

  }

  agregar(){
    this.agregarBoton = true;
    this.proveedor={
      nombre: "",
      RFC:"",
      telefono:"",
      correo:"",
      domicilio: {
          calle:"",
          colonia:"",
          estado:"",
          municipio:"",
          numero_exterior:"",
          numero_interior:"",
      },
      productos:[""],
      _id:""
  }
    this.editarBoton= false;
    this.http.get(`http://localhost:3000/api/producto/`).subscribe((data:any) =>{
        this.productos = data;
    })

  }

  regresar(){
    this.editarBoton= false
    this.agregarBoton= false
    this.ngOnInit();
  }

  agregarBase(){
    console.log(this.AgregarProducto);
    this.http.post(`http://localhost:3000/api/proveedor/`,this.proveedor).subscribe((data:any) =>{
      if(data.nombre){
        Swal.fire(
          'Se agrego el proveedor',
          `El proveedor ${this.proveedor.nombre} se agrego de forma correcta`,
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

  
  agregarProductoBtn(id:String){
    this.agregarProductoBoton = true;
    console.log(this.agregarProductoBoton);
    
    this.agregarProductoBoton = true;
    this.editarBoton= false;
    this.agregarBoton= false
    this.http.get(`http://localhost:3000/api/proveedor/${id}`).subscribe((data:any) =>{
        this.proveedor = data;
    })
    this.http.get(`http://localhost:3000/api/producto/`).subscribe((data:any) =>{
        this.productos = data;
    })
  }


  agregarProductoBase(){
    this.provee.proveedor= this.proveedor._id;
    console.log(this.proveedor);
    
    console.log(this.provee);
    this.http.post(`http://localhost:3000/api/provee/`,this.provee).subscribe((data:any) =>{
      this.provee= data
      this.http.get(`http://localhost:3000/api/producto/${this.provee.id_producto}`).subscribe((data2:any) =>{
        this.producto= data2
        var aux = this.producto.cantidad.toString()
        var aux2 = parseInt(aux) + parseInt(this.provee.cantidad.toString())
        console.log(aux2);
        
        this.producto.cantidad= aux2.toString()
        this.http.put(`http://localhost:3000/api/producto/${this.provee.id_producto}`,this.producto).subscribe((data3:any) =>{
          this.producto=data3
          console.log(this.producto);
          if(this.producto.nombre){
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
          
        })
      })
    })
    
    

  }


}
