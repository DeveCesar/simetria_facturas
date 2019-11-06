import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  API_BASE: string = 'https://api-fac.herokuapp.com/clientes';

  constructor(
    private http: HttpClient
  ) { }

  getClientes(){
  	return this.http.get(`${this.API_BASE}`);
  }

  saveCliente(c){
    var cliente = Object.assign({},c);
    var id = cliente._id;

    delete cliente._id;
    delete cliente._id;
    return this.http.post(`${this.API_BASE}/add-clientes`,{cliente});
  }

  deleteCliente(id){
  	return this.http.get(`${this.API_BASE}/delete/${id}`);
  }

  updateCliente(c){
    var cliente = Object.assign({},c);
    var id = cliente._id;

    delete cliente._id;
    
  	return this.http.post(`${this.API_BASE}/update/${id}`,{cliente});
  }

}
