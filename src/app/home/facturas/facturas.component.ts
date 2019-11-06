import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';
import { Factura } from '../../models/factura';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

	facturas: Factura[];

  constructor(private facturaService: FacturaService) { }

  ngOnInit() {
  	this.getFacturas();
  }

  getFacturas(){
  	this.facturaService.getFacturas()
  		.subscribe(
  			res => {
  				this.facturas = res['facturas'];
  			},
  			err => {
  				console.log("Error al obtener las facturas")
  			});
  }

}
