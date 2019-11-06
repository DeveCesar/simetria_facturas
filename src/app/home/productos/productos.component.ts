import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from '../../services/producto.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {


  productos: Producto[];

  producto: Producto = {
    _id: "",
    titulo:"",
    descripcion: "",
    precio: 0
  }

  constructor(private productoService: ProductoService) { }

  ngOnInit() {
    this.productoService.getProductos().subscribe(
      res => {
        this.productos = res['producto'];
      },
      err => {
        alert(err);
      })
  }

  guardarProducto() {
    this.loading("l-guardar", true);

    if(this.producto._id == ""){
      //guardar producto
      this.productoService.saveProducto(this.producto)
        .subscribe(res =>{
          //limpiamos los campos
          this.producto = {
            _id: "",
            titulo:"",
            descripcion: "",
            precio: 0
          };

          this.productos.push(res['producto']);

          this.loading("l-guardar", false);
          $("#closeProductoModal").click();
        },
        err => {
          alert(err);
          this.loading("l-guardar", false);
        });    
    }else{
      //actualizar producto
      this.productoService.updateProducto(this.producto)
        .subscribe(res =>{

          this.productos.map(p => {
            if(p._id == this.producto._id){
              p = this.producto;
            }
          })

          //limpiamos los campos
          this.producto = {
            _id: "",
            titulo:"",
            descripcion: "",
            precio: 0
          };

          this.loading("l-guardar", false);
          $("#closeProductoModal").click();
        },
        err => {
          alert(err);
          this.loading("l-guardar", false);
        });
    }

 
  }

  eliminarProducto(id){
    var confirmar = confirm("Desea eliminar este producto?");

    if(confirmar){
      this.productoService.deleteProducto(id)
        .subscribe(res =>{
          //lo eliminamos de la lista
          this.productos = this.productos.filter(p => p._id != id);
        },
        err => {
          alert(err);
        });
    }
  }

  editarProducto(producto){
    this.producto = producto;
  }

  loading(name, show) {
    if (show) {
      document.getElementById(name).style.display = "inline-block";
    } else {
      document.getElementById(name).style.display = "none";
    }
  }

}
