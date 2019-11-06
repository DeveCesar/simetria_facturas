import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiFacturaService {

  API_BASE: string = 'http://localhost/factura-blackbox/app/';

  constructor(private http: HttpClient) { }


  envio_datos(datos): Observable<Object> {
    const formData = new FormData();
    formData.append("datos", JSON.stringify(datos));

    return this.http.post<Object>(`${this.API_BASE}`, formData)
      .pipe(tap(
        (res: Object) => {
          if (res) {
            console.log('Datos generados correctamente');
          }
        },
        (error) => {
          console.log(error);
        }
      ));
  }
}
