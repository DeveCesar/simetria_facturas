import { AuthGuardService } from './../guards/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { FacturasComponent } from './facturas/facturas.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'clientes', pathMatch: 'full' },
      { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuardService] },
      { path: 'productos', component: ProductosComponent,canActivate: [AuthGuardService] },
      { path: 'facturas', component: FacturasComponent,canActivate: [AuthGuardService] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
