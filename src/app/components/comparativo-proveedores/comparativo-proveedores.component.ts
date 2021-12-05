import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-comparativo-proveedores',
  templateUrl: './comparativo-proveedores.component.html',
  styleUrls: ['./comparativo-proveedores.component.css']
})
export class ComparativoProveedoresComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public provee:any;
  public proveedores=[0];
  public cantidad=[0];
  public sinRepetidos: Set<number> = new Set;
  public aux=0;


  public barChartData: ChartDataSets[] = [
    { data: this.cantidad, label: 'Series A' },
    
  ];

  



  constructor(private http: HttpClient) { 
    this.http.get(`http://localhost:3000/api/provee`).subscribe((data:any) =>{
      this.provee= data
      this.provee.forEach((element: any) => {
        console.log(element);
          this.proveedores.push(element.proveedor);        
      });
      this.proveedores.shift();
      console.log(this.proveedores)
      this.sinRepetidos = new Set(this.proveedores);
      console.log(this.sinRepetidos);
      this.sinRepetidos.forEach((element:any) =>{
        this.proveedores.forEach((element2:any) => {
          if(element.value == element2.proveedor ){
            this.aux++;
          }
        });
        this.cantidad.push(this.aux);
        this.aux=0;
        this.http.get(`http://localhost:3000/api/proveedor/${element}`).subscribe((data:any)=>{
          this.barChartLabels.push(data.nombre);
        })
      })
      console.log(this.cantidad);
      this.cantidad.shift()
      this.barChartData = [
        { data: this.cantidad, label: 'Proveedores' },
        
      ];
    })
  }

  ngOnInit() {
  }

}
