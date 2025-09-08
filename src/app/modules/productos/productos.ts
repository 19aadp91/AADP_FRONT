import { Component } from '@angular/core';
import { ProductoService } from './services/ProductoService';
import { Producto } from './models/Producto';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-productos',
  imports: [CommonModule, NzTableModule],
  templateUrl: './productos.html',
  styleUrl: './productos.scss'
})
export class Productos {
agregarProducto() {
throw new Error('Method not implemented.');
}

  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getAll().subscribe(data => {
      this.productos = data;
    });
  }
}
