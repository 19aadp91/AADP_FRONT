import { Component } from '@angular/core';
import { ProductoService } from './services/ProductoService';
import { Producto } from './models/Producto';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ProductoFormComponent } from './componentes/producto-form-component/producto-form-component';

@Component({
  selector: 'app-productos',
  imports: [CommonModule, NzTableModule,NzModalModule],
  templateUrl: './productos.html',
  styleUrl: './productos.scss'
})
export class Productos {
  agregarProducto() {
    this.modal.create({
      nzTitle: 'Agregar nuevo producto',
      nzContent: ProductoFormComponent,
      nzFooter: null,
      nzWidth: 600
    });
  }

  productos: Producto[] = [];

  constructor(private productoService: ProductoService, private modal: NzModalService) { }

  ngOnInit(): void {
    this.productoService.getAll().subscribe(data => {
      this.productos = data;
    });
  }
}
