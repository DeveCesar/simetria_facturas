import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

    API_BASE: string = 'https://api-fac.herokuapp.com/productos';

  constructor(
    private http: HttpClient
  ) { }

  getProductos(){
  	return this.http.get(`${this.API_BASE}`);
  }

  saveProducto(producto){
    delete producto._id;
  	return this.http.post(`${this.API_BASE}/add-producto`,{producto});
  }

  deleteProducto(id){
  	return this.http.get(`${this.API_BASE}/delete/${id}`);
  }

  updateProducto(p){

    var producto = Object.assign({},p);
    var id = producto._id;

    delete producto._id;

  	return this.http.post(`${this.API_BASE}/update/${id}`,{producto});
  }
}
