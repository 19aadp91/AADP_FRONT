import { Component } from '@angular/core';
import { ProductoService } from './services/ProductoService';
import { Producto } from './models/Producto';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ProductoFormComponent } from './componentes/producto-form-component/producto-form-component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-productos',
  imports: [CommonModule, NzTableModule, NzModalModule],
  templateUrl: './productos.html',
  styleUrl: './productos.scss'
})
export class Productos {
  
  agregarProducto(producto?: Producto) {
  const modalRef = this.modal.create({
    nzTitle: producto ? 'Editar producto' : 'Agregar nuevo producto',
    nzContent: ProductoFormComponent,
    nzFooter: null,
    nzWidth: 600,
    nzData: {
      producto
    }
  });

  modalRef.afterClose.subscribe(() => {
    this.recargarProductos();
  });
}


  recargarProductos() {
    this.productoService.getAll().subscribe(data => {
      this.productos = data;
    });
  }

  productos: Producto[] = [];

  constructor(private productoService: ProductoService, private modal: NzModalService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.recargarProductos();
  }

  eliminarProducto(id: number) {
    this.productoService.delete(id).subscribe({
      next: () => {
        this.message.success('Producto eliminado correctamente');
        this.recargarProductos();
      },
      error: (err) => {
        this.message.error('Error al eliminar el producto');
        console.error('Error al eliminar:', err);
      }
    });
  }
}
