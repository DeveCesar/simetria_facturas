import { AuthGuardService } from './../guards/auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';

import {ClienteService} from '../services/cliente.service';
import {ProductoService} from '../services/producto.service';
import {FacturaService} from '../services/factura.service';
import { FacturasComponent } from './facturas/facturas.component';


@NgModule({
  declarations: [HomeComponent, ClientesComponent, ProductosComponent, FacturasComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ],
  providers: [
    ClienteService,ProductoService,FacturaService, AuthGuardService
  ]
})
export class HomeModule { }
