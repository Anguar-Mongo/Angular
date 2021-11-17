import { Component, OnInit } from '@angular/core';
import { compra } from 'src/app/interfaces/compra.interfaz';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  admin:boolean=false;
  p: number = 1;

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
        active:true,
        producto:[{
            id_producto:"",
            cantidad:0
        }],
        _id:""
  }

  usuarios:any;

  compras:any;

  editarBoton:boolean = false;
  agregarBoton:boolean = false;



  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if(localStorage.getItem('admin')=="true"){
      this.admin=true;
      this.agregarBoton = false;
      this.editarBoton= false;
      this.compra ={
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
        active:true,
        producto:[{
            id_producto:"",
            cantidad:0
        }],
        _id:""
      }
      this.http.get(`http://localhost:3000/api/compra/`).subscribe((data:any) =>{
        this.compras = data
        console.log(this.compra);
        
      })
      this.http.get(`http://localhost:3000/api/usuario/`).subscribe((data:any) =>{
        this.usuarios = data
        
      })

      
      

    }

  }

  EditarCompra(id:String){
    this.editarBoton= true
    this.http.get(`http://localhost:3000/api/compra/${id}`).subscribe((data:any) =>{
      this.compra= data;
    })
  }

  editarBase(){
    this.http.put(`http://localhost:3000/api/compra/${this.compra._id}`,this.compra).subscribe((data:any) =>{
      if(data.placa){
        Swal.fire(
          'Se edito la compra',
          `La compra ${this.compra._id} se edito de forma correcta`,
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
    this.http.delete(`http://localhost:3000/api/compra/${id}`).subscribe((data:any)=>{
      if(data.placa){
        Swal.fire(
          'Se elimino',
          `El compra ${data._id} se elimino de forma correcta`,
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
    console.log(this.compra);
    this.http.post(`http://localhost:3000/api/compra/`,this.compra).subscribe((data:any) =>{
      if(data.placa){
        Swal.fire(
          'Se agrego el compra',
          `El compra ${this.compra._id} se agrego de forma correcta`,
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
