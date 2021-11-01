import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { compra } from 'src/app/interfaces/compra.interfaz';
import { envio } from 'src/app/interfaces/envio.interfaz';
import { usuario } from 'src/app/interfaces/usuario.interfaz';
import { empleado } from 'src/app/interfaces/empleado.interfaz'


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  p: number = 1;

  carrito:any;
  aux:string | null="";

  compra:compra={
      id_envio:"",
        id_usuario:"",
        domicilio: {
            calle:"",
            colonia:"",
            estado:"",
            municipio:"",
            numero_exterior:"",
            numero_interior:"",
        },
        total:0,
        active:false,
        _id:""
  }

  envio:envio={
    fechas:{
      empaque:new Date(),
      envio:new Date(),
      recibido:new Date()
  },
    notas:"",
    domicilio: {
      calle:"",
      colonia:"",
      estado:"",
      municipio:"",
      numero_exterior:"",
      numero_interior:"",
  },
    active:false,
    id_empleado:"",
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
    telefono:""
}

empleado:empleado ={
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
  fecha_ingreso:new Date(),
  active:true,
  _id:""
}
empleados:Array<empleado>=[];
envioActualizado:any;



  

  constructor(private http: HttpClient) { 
    this.aux =localStorage.getItem('carrito');
    if(this.aux){
      this.carrito= JSON.parse(this.aux)
      console.log("Carrito: ", this.carrito);
      
    }
    
  }

  ngOnInit(): void {
  }

  Comprar(){
    //SE GENERA ENVIO
    //Parte de FECHAS 
    let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
    const hoy = new Date();
    this.envio.fechas.empaque=  new Date(hoy.getTime()+DIA_EN_MILISEGUNDOS);
    this.envio.fechas.envio=  new Date(hoy.getTime()+(2*DIA_EN_MILISEGUNDOS));
    this.envio.fechas.recibido=  new Date(hoy.getTime()+(3*DIA_EN_MILISEGUNDOS));
    //Se llena el domicilio 
    var id_usuario = localStorage.getItem('id');
    this.http.get(`http://localhost:3000/api/usuario/${id_usuario}`).subscribe((data:any) =>{
      this.usuario= data
      this.envio.domicilio = this.usuario.domicilio
    })
    this.envio.active=true;
    //Se asgina el envio a un empleado
    this.http.get(`http://localhost:3000/api/empleado/`).subscribe((data:any) =>{
      this.empleados= data;
      var numeroEmpleados=this.empleados.length;
      var empleadoAsignado = Math.round(Math.random() * (1 - numeroEmpleados) + 1) -1;
      
      this.empleado = this.empleados[empleadoAsignado]
      console.log(this.envio.domicilio);
      this.envio.id_empleado = this.empleado._id;
      
    })
    this.http.post(`http://localhost:3000/api/envio`,this.envio).subscribe((data) =>{
      console.log(data)
      //se actualiza el envio
      this.envioActualizado = data;
      //se llenan los datos de la compra
      if(id_usuario){
        this.compra.id_usuario = id_usuario;
      }
      this.compra.id_envio= this.envioActualizado._id;

      this.http.post(`http://localhost:3000/api/compra`,this.compra).subscribe((data) =>{
        console.log(data);
      })
    })
    
    
  }

  EliminarCarrito(data:string){
    var id=0;

    this.carrito.forEach((element: { nombre: string; }) => {
      
      if(element.nombre=data){
        console.log("_ID: "+element.nombre);
        console.log("DATA: "+data);
        this.carrito.splice(id,1);
        
      }
      id++;
      
    });
    console.log(this.carrito);
    

  }


}
