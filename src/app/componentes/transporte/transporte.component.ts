import { Component, OnInit } from '@angular/core';
import { transporte } from 'src/app/interfaces/transporte.interfaz';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.component.html',
  styleUrls: ['./transporte.component.css']
})
export class TransporteComponent implements OnInit {
  admin:boolean=false;
  p: number = 1;

  transporte:transporte={
    placa:"",
    empleado:"",
    fecha_compra:new Date,
    active:true,
    _id:""
  }

  empleados:any

  transportes:any

  editarBoton:boolean = false;
  agregarBoton:boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if(localStorage.getItem('admin')=="true"){
      this.admin=true;
      this.agregarBoton = false;
      this.editarBoton= false;
      this.transporte ={
        placa:"",
        empleado:"",
        fecha_compra:new Date,
        active:true,
        _id:""
      }
      this.http.get(`http://localhost:3000/api/transporte/`).subscribe((data:any) =>{
        this.transportes = data
        console.log(this.transportes);
        
      })
      this.http.get(`http://localhost:3000/api/empleado/`).subscribe((data:any) =>{
        this.empleados = data
      })

    }

  }

  EditarTransporte(id:String){
    this.editarBoton= true
    this.http.get(`http://localhost:3000/api/transporte/${id}`).subscribe((data:any) =>{
      this.transporte= data;
    })
  }

  editarBase(){
    this.http.put(`http://localhost:3000/api/transporte/${this.transporte._id}`,this.transporte).subscribe((data:any) =>{
      if(data.placa){
        Swal.fire(
          'Se edito el transporte',
          `El transporte ${this.transporte.placa} se edito de forma correcta`,
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
    this.http.delete(`http://localhost:3000/api/transporte/${id}`).subscribe((data:any)=>{
      if(data.placa){
        Swal.fire(
          'Se elimino',
          `El transporte ${data.placa} se elimino de forma correcta`,
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
    this.editarBoton= false;

  }

  agregarBase(){
    console.log(this.transporte);
    this.http.post(`http://localhost:3000/api/transporte/`,this.transporte).subscribe((data:any) =>{
      if(data.placa){
        Swal.fire(
          'Se agrego el transporte',
          `El transporte ${this.transporte.placa} se agrego de forma correcta`,
          'success'
        )
        this.agregarBoton=false;
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

  regresar(){
    this.editarBoton= false
    this.agregarBoton= false
    this.ngOnInit();
   }

}
