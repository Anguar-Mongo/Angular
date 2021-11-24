import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuario } from 'src/app/interfaces/usuario.interfaz';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
  usuarioResultado:any;

   admin:boolean=false;
   esUsuario:boolean=false;

   esRegister:boolean=false;


  constructor(private http: HttpClient) { 
    if(localStorage.getItem( 'nombre')){
      this.admin = false
      this.esUsuario = true
    }

    if(localStorage.getItem( 'nombre')=="ADMIN"){
      this.admin = true
      this.esUsuario = false
    }

    

  }

  register(){
    this.esRegister = true;
  }

  login(){
    this.http.get(`http://localhost:3000/api/usuario/${this.usuario.correo}/${this.usuario.password}`).subscribe((data) =>{
      this.usuarioResultado= data;
      console.log(this.usuarioResultado[0].nombre);
      localStorage.setItem('nombre',this.usuarioResultado[0].nombre);
      localStorage.setItem('id', this.usuarioResultado[0]._id);
      
      if(this.usuarioResultado[0].nombre){
        this.esUsuario= true;
        this.admin = false;
      }

      if(this.usuarioResultado[0].nombre == "ADMIN"){
        this.admin = true;
        this.esUsuario= false;
        localStorage.setItem("admin", "true");
      }
    })

  }

  ngOnInit(): void {
  }

}
