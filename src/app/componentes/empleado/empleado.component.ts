import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { empleado } from 'src/app/interfaces/empleado.interfaz';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  
  admin:boolean=false;
  p: number = 1;

  empleado:empleado={
    nombre: "",
    apellido_pat:"",
    apellido_mat:"",
    domicilio: {
        calle:"",
        colonia:"",
        estado:"",
        municipio:"",
        numero_exterior:"",
        numero_interior:"",
    },
    telefono:"",
    salario:0,
    fecha_ingreso: new Date(),
    active:true,
    _id:""
  }

  empleados:any

  editarBoton:boolean = false;
  agregarBoton:boolean = false;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.editarBoton= false;
    this.agregarBoton= false;
    this.empleado={
      nombre: "",
    apellido_pat:"",
    apellido_mat:"",
    domicilio: {
        calle:"",
        colonia:"",
        estado:"",
        municipio:"",
        numero_exterior:"",
        numero_interior:"",
    },
    telefono:"",
    salario:0,
    fecha_ingreso: new Date(),
    active:true,
    _id:""
    }
    if(localStorage.getItem('admin')=="true"){
      this.admin=true;
      this.http.get(`http://localhost:3000/api/empleado/`).subscribe((data) =>{
        this.empleados = data;
      })
    }
  }


  EditarEmpleado(id:String){
    this.editarBoton=true;
    this.agregarBoton=false;
    this.http.get(`http://localhost:3000/api/empleado/${id}`).subscribe((data:any) =>{
        this.empleado = data;
      })

  }
  
  editarBase(){
    this.http.put(`http://localhost:3000/api/empleado/${this.empleado._id}`,this.empleado).subscribe((data:any) =>{
      if(data.nombre){
        Swal.fire(
          'Se edito el empleado',
          `El empleado ${this.empleado.nombre} se edito de forma correcta`,
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
    this.http.delete(`http://localhost:3000/api/empleado/${id}`).subscribe((data:any)=>{
      if(data.nombre){
        Swal.fire(
          'Se elimino',
          `El empleado ${data.nombre} se elimino de forma correcta`,
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

  regresar(){
    this.editarBoton= false
    this.agregarBoton= false
    this.ngOnInit();
  }

  agregarBase(){
    console.log(this.empleado);
    this.http.post(`http://localhost:3000/api/empleado/`,this.empleado).subscribe((data:any) =>{
      if(data.nombre){
        Swal.fire(
          'Se agrego el empleado',
          `El empleado ${this.empleado.nombre} se agrego de forma correcta`,
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
