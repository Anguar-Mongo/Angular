import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  p: number = 1;

  carrito:any;
  aux:string | null="";
  

  constructor() { 
    this.aux =localStorage.getItem('carrito');
    if(this.aux){
      //console.log("Carrito: ",JSON.parse(this.aux))
      this.carrito= JSON.parse(this.aux)
      console.log("Carrito: ", this.carrito);
      
    }
    
  }

  ngOnInit(): void {
  }

  EliminarCarrito(data:string){
    this.carrito.forEach((element: { _id: string; }) => {
      if(element._id=data){
        
      }
      
    });
    

  }

}
