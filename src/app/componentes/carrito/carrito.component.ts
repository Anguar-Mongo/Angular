import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { compra } from 'src/app/interfaces/compra.interfaz';
import { envio } from 'src/app/interfaces/envio.interfaz';
import { usuario } from 'src/app/interfaces/usuario.interfaz';
import { empleado } from 'src/app/interfaces/empleado.interfaz';
import { PrecioPipe } from 'src/app/pipes/precio.pipe';
import { se_compra } from 'src/app/interfaces/se_compra.interfaz';
import Swal from 'sweetalert2'
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  p: number = 1;

  carrito:any;
  aux:string | null="";
   DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
   hoy = new Date();

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
        producto:[{
          id_producto:"",
          cantidad:0
      }],
        _id:""
  }

  envio:envio={
    fechas:{
      empaque:new Date(this.hoy.getTime()+(this.DIA_EN_MILISEGUNDOS)),
      envio:new Date(this.hoy.getTime()+(2*this.DIA_EN_MILISEGUNDOS)),
      recibido:new Date(this.hoy.getTime()+(3*this.DIA_EN_MILISEGUNDOS))
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
    telefono:"",
    _id:""
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

se_compra:se_compra={
  id_producto:"",
    id_compra:"",
    cantidad:0
}

empleados:Array<empleado>=[];
envioActualizado:any;

cupon:any;
tieneCupon:boolean=false;

 total:number=0;
 auxPrecio="";

 compraRegreso:any;

 generarPdf:boolean=false;



  

  constructor(private http: HttpClient) { 
    this.aux =localStorage.getItem('carrito');
    if(this.aux){
      this.carrito= JSON.parse(this.aux)
      console.log("Carrito: ", this.carrito);
      
    }

    this.carrito.forEach((element: { precio: string; }) => {
      
      //total = total+ parseFloat(element.precio.replace("$",'') )
      if(element.precio!=""){
        this.total += parseFloat(element.precio.replace("$",''));
      }
      console.log(parseFloat(element.precio.replace("$",'')));
      
    });

    
  }

  ngOnInit(): void {
    var total=0;
    this.generarPdf=false;
    this.carrito.forEach((element: { precio: string; }) => {
      
      //total = total+ parseFloat(element.precio.replace("$",'') )
      if(element.precio!=""){
        total += parseFloat(element.precio.replace("$",''));
      }
      console.log(parseFloat(element.precio.replace("$",'')));
      
    });
    var id_usuario = localStorage.getItem('id');
    this.http.get(`http://localhost:3000/api/cupon/${id_usuario}`).subscribe((data:any) =>{
      this.cupon= data[0];
      console.log(data);
      this.tieneCupon= this.cupon.active
      console.log(data);
    })
    
    
  }

  Comprar(){
    var id_usuario = localStorage.getItem('id');
    if(!this.tieneCupon){
      this.cupon.active = this.tieneCupon
      this.http.put(`http://localhost:3000/api/cupon/${this.cupon._id}`,this.cupon).subscribe((data)=>{

      })
    }

    this.carrito.total = this.total;
    //SE GENERA ENVIO
    //Parte de FECHAS 
    
    
    this.envio.fechas.empaque=  new Date(this.hoy.getTime()+this.DIA_EN_MILISEGUNDOS);
    this.envio.fechas.envio=  new Date(this.hoy.getTime()+(2*this.DIA_EN_MILISEGUNDOS));
    this.envio.fechas.recibido=  new Date(this.hoy.getTime()+(3*this.DIA_EN_MILISEGUNDOS));
    //Se llena el domicilio 
    
    this.http.get(`http://localhost:3000/api/usuario/${id_usuario}`).subscribe((data:any) =>{
      this.usuario= data
      this.envio.domicilio = this.usuario.domicilio
    })
    this.envio.active=true;
    var aux ={id_producto:"1",
              cantidad:0}
    var cont=0;
    this.carrito.forEach((element: any) => {
      if(element._id!='' && cont>0){
        aux={id_producto:element._id, cantidad:1}
        this.compra.producto.push(aux)
        
      }
      cont++;
      
      
    });
    this.compra.producto.shift();

    //Se asgina el envio a un empleado
    this.http.get(`http://localhost:3000/api/empleado/`).subscribe((data:any) =>{
      this.empleados= data;
      var numeroEmpleados=this.empleados.length;
      var empleadoAsignado = Math.round(Math.random() * (1 - numeroEmpleados) + 1) -1;
      
      this.empleado = this.empleados[empleadoAsignado]
      console.log(this.envio.domicilio);
      this.envio.id_empleado = this.empleado._id;
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
          this.compraRegreso = data;
          if(this.compraRegreso._id!=""){
            this.compra.producto.forEach(element => {
              this.se_compra.id_compra= this.compraRegreso._id;
              this.se_compra.id_producto = element.id_producto;
              this.se_compra.cantidad = element.cantidad;
              this.http.post(`http://localhost:3000/api/se_compra`,this.se_compra).subscribe((data) =>{
                console.log(data);
                  Swal.fire(
                    'Compra exitosa',
                    'Compra exitosa',
                    'success'
                  )
                });//fin de se_compra
            })//fin del foreach
          }
          
      });//fin llamada compra
          
          
      });//fin llamada envio
      
    });// fin de llamada empleado
    
    this.generarPdf = true;
    this.exportAsPDF();
    
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


  exportAsPDF()
      {
        let data = document.getElementById('MyDIv2');
        if(data!=null){
          html2canvas(data).then(canvas => {
            const contentDataURL = canvas.toDataURL('image/png')  
            let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
            // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
            pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
            pdf.save('Recibo.pdf');   
          }); 
        }  
        
      }

      usarCupon(){
        this.total = this.total - ((this.cupon.porcentaje/100) *this.total )
        console.log(this.total);
        this.tieneCupon=false;
        Swal.fire(
          'Se uso el cupon',
          'Se uso el cupon',
          'success'
        )
        
      }

}
