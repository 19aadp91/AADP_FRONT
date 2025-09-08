import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private readonly urlBase: string = environment.apiProducto; // ajusta la URL

  constructor(private http: HttpClient) { }

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlBase}/GetAll`);
  }

  create(producto: Producto): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${this.urlBase}/Insert`, producto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/Delete/${id}`);
  }

  update(producto: Producto): Observable<void> {
    return this.http.put<void>(`${this.urlBase}/Update`, producto);
  }

}
