import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { ProductoService } from '../../services/ProductoService';
import { Producto } from '../../models/Producto';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-producto-form-component',
  imports: [ReactiveFormsModule, NzInputModule, NzDatePickerModule, NzButtonModule],
  templateUrl: './producto-form-component.html',
  styleUrl: './producto-form-component.scss'
})
export class ProductoFormComponent {
  form = new FormGroup({
    codigoProducto: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    referenciaInterna: new FormControl('', [Validators.required]),
    precioUnitario: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    unidadMedida: new FormControl('', [Validators.required]),
    fechaCreacion: new FormControl(new Date(), [Validators.required])
  });

  constructor(private productoService: ProductoService, private modalRef: NzModalRef, private message: NzMessageService,@Inject(NZ_MODAL_DATA) public data: { producto?: Producto }) 
  { 
    if (data.producto) {
      this.form.patchValue({
      codigoProducto: String(data.producto.codigoProducto),
      nombre: data.producto.nombre,
      descripcion: data.producto.descripcion,
      referenciaInterna: data.producto.referenciaInterna,
      precioUnitario: String(data.producto.precioUnitario),
      estado: data.producto.estado,
      unidadMedida: data.producto.unidadMedida,
      fechaCreacion: new Date(data.producto.fechaCreacion)
    });
    }
  }

 submit() {
  if (this.form.valid) {
    const producto: Producto = {
      codigoProducto: Number(this.form.get('codigoProducto')?.value),
      nombre: this.form.get('nombre')?.value ?? '',
      descripcion: this.form.get('descripcion')?.value ?? '',
      referenciaInterna: this.form.get('referenciaInterna')?.value ?? '',
      precioUnitario: Number(this.form.get('precioUnitario')?.value),
      estado: this.form.get('estado')?.value ?? '',
      unidadMedida: this.form.get('unidadMedida')?.value ?? '',
      fechaCreacion: new Date(this.form.get('fechaCreacion')?.value ?? '')
    };

    if (this.data.producto) {
      this.productoService.update(producto).subscribe({
        next: () => {
          this.message.success('Producto actualizado correctamente');
          this.modalRef.close();
        },
        error: () => {
          this.message.error('Error al actualizar el producto');
        }
      });
    } else {
      this.productoService.create(producto).subscribe({
        next: (data) => {
          this.message.success(data.mensaje);
          this.modalRef.close(data.mensaje);
        },
        error: () => {
          this.message.error('Error al crear el producto');
        }
      });
    }
  }
}



  cancel() {
    this.modalRef.destroy();
  }
}
