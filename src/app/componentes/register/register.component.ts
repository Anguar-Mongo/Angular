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
    telefono:""
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
      this.http.post(`http://localhost:3000/api/usuario/`,this.usuario).subscribe((data) =>{
        console.log(data);
        Swal.fire(
          'Registro exitoso',
          'Registro exitoso',
          'success'
        )
        window.location.reload()

        
      })
    }
    
  }

  ngOnInit(): void {
  }

}
