import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/interfaces/usuario.interfaz';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //Swal = require('sweetalert2')
  DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
   hoy = new Date();
  cupon={
        nombre:"Inicio",
        porcentaje:20,
        fecha_emision:new Date(this.hoy.getTime()).toString(),
        fecha_termino:new Date(this.hoy.getTime()+(30*this.DIA_EN_MILISEGUNDOS)).toString(),
        numero_usado:0,
        active:true,
        codigo:"INICIOCODIGO",
        id_usuario:"",
  }

  usuario:usuario ={
    nombre: "",
    apellido_pat:"",
    apellido_mat:"",
    correo:"",
    password: "",
    domicilio: {
        calle:"",
        colonia:"",
        estado:"",
        municipio:"",
        numero_exterior:"",
        numero_interior:""
    },
    telefono:"",
    _id:""
}

  constructor(private http: HttpClient) { }


  register(){
    console.log(this.usuario)
    if(this.usuario.nombre=="" || this.usuario.apellido_pat=="" || this.usuario.correo=="" || this.usuario.password=="" ||
    this.usuario.domicilio.calle=="" || this.usuario.domicilio.colonia=="" || this.usuario.domicilio.estado=="" ||
    this.usuario.domicilio.municipio=="" ||this.usuario.domicilio.numero_exterior=="" || this.usuario.telefono==""){
      Swal.fire(
        'Informacion erronea',
        'Por favor llena todos los campos con * para poder registrarse',
        'question'
      )
    }else{
      this.http.post(`http://localhost:3000/api/usuario/`,this.usuario).subscribe((data:any) =>{
        console.log(data);
        Swal.fire(
          'Registro exitoso',
          'Registro exitoso',
          'success'
        )
        this.cupon.id_usuario = data._id;
        this.http.post(`http://localhost:3000/api/cupon/`,this.cupon).subscribe((data2:any) =>{
          
        })
        window.location.reload()

        
      })
    }
    
  }

  ngOnInit(): void {
  }

}
