import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalRef } from 'ng-zorro-antd/modal';
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
    fechaCreacion: new FormControl(null, [Validators.required])
  });

  constructor(private productoService: ProductoService, private modalRef: NzModalRef, private message: NzMessageService) { }

  submit() {
    if (this.form.valid) {
      const nuevoProducto: Producto = {
        codigoProducto: Number(this.form.get('codigoProducto')?.value),
        nombre: this.form.get('nombre')?.value ?? '',
        descripcion: this.form.get('descripcion')?.value ?? '',
        referenciaInterna: this.form.get('referenciaInterna')?.value ?? '',
        precioUnitario: Number(this.form.get('precioUnitario')?.value),
        estado: this.form.get('estado')?.value ?? '',
        unidadMedida: this.form.get('unidadMedida')?.value ?? '',
        fechaCreacion: new Date(this.form.get('fechaCreacion')?.value ?? '')
      };

      this.productoService.create(nuevoProducto).subscribe(data => {
          console.log('Producto creado:', data.mensaje);
          this.modalRef.close(data.mensaje);
      });
    }
  }

  cancel() {
    this.modalRef.destroy();
  }
}
