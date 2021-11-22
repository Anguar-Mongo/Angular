import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-comparativo-mensual-chart',
  templateUrl: './comparativo-mensual-chart.component.html',
  styleUrls: ['./comparativo-mensual-chart.component.css']
})
export class ComparativoMensualChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public compras:any
  public ventas:Array<any>=[{
    id:"",
    venta:0
  }]

  public aux:any
  public ve:Array<any>=[]

  public entro:boolean=false;

  public productos:any;

  public cantidad=[0];

  public barChartData: ChartDataSets[] = [
    { data: this.cantidad, label: 'Productos' }
    
  ];

  constructor(private http: HttpClient) {
    

    this.http.get(`http://localhost:3000/api/compra`).subscribe((data:any)=>{
      console.log(data);
      this.compras= data;
      data.forEach((element: any) => { //se recorre toda la respuesta
        this.aux=element.producto; //se saca solo el vector de los productis
        this.aux.forEach((element2: any) => {  //se recorre los productos de la venta
        //  console.log(element2.id_producto);
          this.ve.push(element2.id_producto);
          
        });
      });
      this.ve.sort();
      this.ve.forEach(element => {
        console.log(element);
        this.ventas.forEach(element2 =>{
          if(element2.id == element && !this.entro){
            element2.venta++;
            this.entro = true;
          }
        })
        if(!this.entro){
          this.ventas.push({id:element, venta:1})
        }
        this.entro=false;

        /*this.http.get(`http://localhost:3000/api/producto`).subscribe((data:any) =>{
          this.productos = data;
          console.log(this.productos);
      
        })*/

      });
      

      console.log("------------------------------------------------------------");
      //this.compras.shift();
      this.ventas.shift()
      this.ventas.forEach(element => {
        console.log(element);
        
      });
      this.ventas.forEach(element =>{
        if(element.venta)
          this.cantidad.push(element.venta)
        this.http.get(`http://localhost:3000/api/producto/${element.id}`).subscribe((data:any)=>{
            console.log("Hola")
            this.barChartLabels.push(data.nombre);
            
          })
      })
      this.cantidad.shift();
      console.log(this.cantidad);
      
      
      
      
      
    })
    
    //console.log("VENTAS "+this.ve);
    
   }

  ngOnInit() {
  }

}
