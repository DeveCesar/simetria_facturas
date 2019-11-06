import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

    API_BASE: string = 'https://api-fac.herokuapp.com/facturas';
    API_FACTURA: string = 'https://reporte-fac.herokuapp.com/app/index.php';

  constructor(
    private http: HttpClient
  ) { }

  getFacturas(){
  	return this.http.get(`${this.API_BASE}`);
  }

  saveFactura(factura){
    
    delete factura._id;

  	return this.http.post(`${this.API_BASE}/add-factura`,{factura});
  }

  deleteFactura(id){
  	return this.http.get(`${this.API_BASE}/delete/${id}`);
  }

  updateFactura(f){
    var factura = Object.assign({},f);
    var id = factura._id;

    delete factura._id;

  	return this.http.post(`${this.API_BASE}/update/${id}`,{factura});
  }

  imprimirFactura(datos) {

    const formData = new FormData();
    formData.append("datos", JSON.stringify(datos));

    return this.http.post(`${this.API_FACTURA}`, formData, { 
      responseType: 'blob'
    });
  }

  getConsecutivo(){
    return this.http.get(`${this.API_BASE}/get-consecutivo`);
  }
  
}
