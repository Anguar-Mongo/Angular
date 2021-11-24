import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuario } from 'src/app/interfaces/usuario.interfaz';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  admin:boolean=false;
  p: number = 1;

  buscarPersona:String|null="";

  usuario:usuario={
    nombre: "",
    apellido_pat:"",
    apellido_mat:"",
    correo:"",
    password:"",
    domicilio: {
        calle:"",
        colonia:"",
        estado:"",
        municipio:"",
        numero_exterior:"",
        numero_interior:"",
    },
    telefono:"",
    _id:""
  }

  usuarios:any

  editarBoton:boolean = false;
  agregarBoton:boolean = false;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.editarBoton= false;
    this.agregarBoton= false;
    this.usuario={
      nombre: "",
    apellido_pat:"",
    apellido_mat:"",
    correo:"",
    password:"",
    domicilio: {
        calle:"",
        colonia:"",
        estado:"",
        municipio:"",
        numero_exterior:"",
        numero_interior:"",
    },
    telefono:"",
    _id:""
    }
    if(localStorage.getItem('admin')=="true"){
      this.admin=true;
      this.http.get(`http://localhost:3000/api/usuario/`).subscribe((data) =>{
        this.usuarios = data;
      })
    }
  }


  Editarusuario(id:String){
    this.editarBoton=true;
    this.agregarBoton=false;
    this.http.get(`http://localhost:3000/api/usuario/${id}`).subscribe((data:any) =>{
        this.usuario = data;
      })

  }
  
  editarBase(){
    this.http.put(`http://localhost:3000/api/usuario/${this.usuario._id}`,this.usuario).subscribe((data:any) =>{
      if(data.nombre){
        Swal.fire(
          'Se edito el usuario',
          `El usuario ${this.usuario.nombre} se edito de forma correcta`,
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
    this.http.delete(`http://localhost:3000/api/usuario/${id}`).subscribe((data:any)=>{
      if(data.nombre){
        Swal.fire(
          'Se elimino',
          `El usuario ${data.nombre} se elimino de forma correcta`,
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
    console.log(this.usuario);
    this.http.post(`http://localhost:3000/api/usuario/`,this.usuario).subscribe((data:any) =>{
      if(data.nombre){
        Swal.fire(
          'Se agrego el usuario',
          `El usuario ${this.usuario.nombre} se agrego de forma correcta`,
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
    this.buscarPersona = val;
    console.log(this.buscarPersona);
    this.http.get(`http://localhost:3000/api/usuario/buscador/${this.buscarPersona}`).subscribe((data) =>{
      this.usuarios = data
    })
    
  }


}
