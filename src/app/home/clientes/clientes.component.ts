import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cliente } from 'src/app/models/cliente';
import { Factura } from 'src/app/models/factura';
import { Producto } from 'src/app/models/producto';

import { ClienteService } from '../../services/cliente.service';
import { ProductoService } from '../../services/producto.service';
import { FacturaService } from '../../services/factura.service';

import swal from'sweetalert2';

import * as $ from 'jquery';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  //clientes = [{ cliente: "ESE CAMU SAN RAFAEL", nit: "812.001.579-2", tel: "", dir: "CRA 14 NRO 2E - 25 BR LAS MERCEDES", numero: "SSI 00000095", fechaInicio: "01 Ago 2019", fechaFin: "30 Ago 2019", detalles: [{ descripcion: { titulo: "Plataforma Simetria Consolidated Pago NB", cuerpo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, officiis impedit! Rem saepe a fugit laboriosam vel perspiciatis odio mollitia alias esse voluptatem perferendis accusantium, tempore, obcaecati nulla laudantium dignissimos! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, officiis impedit! Rem saepe  fugit laboriosam vel perspiciatis odio mollitia alias esse voluptatem perferendis  accusantium, tempore, obcaecati nulla laudantium ignissimos!" }, unidad: "3500000", cantidad: "1" }], desc: "0" }];

  clientes: Cliente[];

  cliente: Cliente = {
    _id: "",
    nit: "",
    nombre: "",
    tel: 0,
    dir: ""
  }

  factura: Factura = {
    _id: "",
    cliente: "",
    numero: "",
    fechaInicio: "",
    fechaFin: "",
    detalles: [],
    desc: 0
  }

  productos: Producto[];
  productosBack: Producto[];

  detalles = [];

  totalFactura = 0;

  busqueda = "";


  constructor(private router: Router,
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private facturaService: FacturaService) { }

  ngOnInit() {
    //cargamos los clientes
    this.clienteService.getClientes().subscribe(
      res => {

        this.clientes = res['clientes'];
      },
      err => {
        alert(err);
      });

    //cargamos los productos
    this.productoService.getProductos().subscribe(
      res => {
        this.productos= res['producto'];
        this.productosBack = res['producto'];
      },
      err => {
        alert(err);
      });

  }

  //APARTADO DE CLIENTES

  guardarCliente() {
    this.loading("l-guardar", true);

    console.log(this.cliente);

    if(this.cliente._id == ""){
      //guardar producto
      this.clienteService.saveCliente(this.cliente)
        .subscribe(res =>{
          //limpiamos los campos
          this.cliente = {
            _id: "",
            nit: "",
            nombre: "",
            tel: 0,
            dir: ""
          }

          this.clientes.push(res['cliente']);

          this.loading("l-guardar", false);
          $("#closeClienteModal").click();
        },
        err => {
          alert(err);
          this.loading("l-guardar", false);
        });    
    }else{
      //actualizar producto
      this.clienteService.updateCliente(this.cliente)
        .subscribe(res =>{

          this.clientes.map(c => {
            if(c._id == this.cliente._id){
              c = this.cliente;
              return;
            }
          })

          //limpiamos los campos
          this.cliente = {
            _id: "",
            nit: "",
            nombre: "",
            tel: 0,
            dir: ""
          }

          this.loading("l-guardar", false);
          $("#closeClienteModal").click();
        },
        err => {
          alert(err);
          this.loading("l-guardar", false);
        });
    }
  }

  eliminarCliente(id){
    var confirmar = confirm("Desea eliminar este Cliente?");

    if(confirmar){
      this.clienteService.deleteCliente(id)
        .subscribe(res =>{
          //lo eliminamos de la lista
          this.clientes = this.clientes.filter(c => c._id != id);
        },
        err => {
          alert(err);
        });
    }
  }

  seleccionarCliente(cliente){
    this.cliente = cliente;
    this.getConsecutivo();
  }

  getConsecutivo(){
    this.facturaService.getConsecutivo().subscribe(
      res => {
        this.factura.numero = res['consecutivo'];
        console.log(this.factura.numero)
      },
      err => {
        alert(err);
      });
      
  }

  //APARTADO DE LA FACTURA
  seleccionarProducto(){
    if(this.busqueda.length > 0){
      
      var productoDetalle = this.productos.filter(p => p.titulo == this.busqueda)[0];

      this.productos = this.productos.filter(p => p != productoDetalle);

      this.detalles.push({
        producto: productoDetalle,
        cantidad: 1,
        total: productoDetalle.precio
      });

      this.busqueda = '';
      this.calcularTotalFactura();
    }
  }

  eliminarProductoDetalle(producto){
    this.detalles = this.detalles.filter(d => d.producto._id != producto._id);
    this.productos.push(producto);
    this.calcularTotalFactura();
  }

  cambiarCantidad(d){
    d.total = (d.producto.precio * d.cantidad);
    this.calcularTotalFactura();
  }

  calcularTotalFactura(){
    this.totalFactura = 0;

    for (var i = 0; i < this.detalles.length; i++) {
      var d = this.detalles[i];
      this.totalFactura += (d.producto.precio * d.cantidad);
    }

    this.totalFactura -= this.factura.desc;

  }


  guardarFactura(){

    this.loading("l-guardarfactura", true);
    
    this.factura.cliente = this.cliente._id;

    this.detalles.map(d => {
        this.factura.detalles.push({
        producto: d.producto._id,
        cantidad: d.cantidad
      });
    })

    this.facturaService.saveFactura(this.factura)
        .subscribe(res =>{


          this.loading("l-guardarfactura", false);
          $("#closeFacturaModal").click();

          this.factura.cliente = this.cliente.nombre;
          this.factura.nit = this.cliente.nit;
          this.factura.dir = this.cliente.dir;
          this.factura.tel = this.cliente.tel;
          this.factura.detalles = [];

          //imprimimos el documento
          this.detalles.map(d => {
              this.factura.detalles.push({
                descripcion:{
                  titulo: d.producto.titulo,
                  cuerpo: d.producto.descripcion
                },
                unidad: d.producto.precio,
                cantidad: d.cantidad
            });
          });

          this.sweetAlert("Generando Factura", 'info');

          this.facturaService.imprimirFactura(this.factura)
            .subscribe(res => {

              this.sweetAlert("Inicio la descarga", 'info');
              var url = window.URL.createObjectURL(res);
              var a = document.createElement('a');
              document.body.appendChild(a);
              a.setAttribute('style', 'display: none');
              a.href = url;
              a.download = "Factura.pdf";
              a.click();
              window.URL.revokeObjectURL(url);
              a.remove(); // remove the element


              //Limpiamos las variables
              this.factura = {
                _id: "",
                cliente: "",
                numero: "",
                fechaInicio: "",
                fechaFin: "",
                detalles: [],
                desc: 0
              }

              this.detalles = [];

              this.productos = this.productosBack;

              this.totalFactura = 0;

            }, error => {
              console.log('download error:', JSON.stringify(error));
            }, () => {
              this.sweetAlert("Factura Generada", 'success');
            });

        },
        err => {
          alert(err);
          this.loading("l-guardarfactura", false);
        }); 
  }

  loading(name, show) {
    if (show) {
      document.getElementById(name).style.display = "inline-block";
    } else {
      document.getElementById(name).style.display = "none";
    }
  }


  //funcion para evitar error en el formulario de la factura
  pulsar(e) {
    var tecla = (document.all) ? e.keyCode :e.which;
    return (tecla!=13);
  }

  sweetAlert(msj, icon){
    const Toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    })

    Toast.fire({
      icon: icon,
      title: msj
    })
  }

}
