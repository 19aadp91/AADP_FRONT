import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private readonly urlBase: string = environment.apiProducto; // ajusta la URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlBase}/GetAll`);
  }
}
