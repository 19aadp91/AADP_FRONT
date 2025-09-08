export interface Producto {
  codigoProducto: number;
  nombre: string;
  descripcion: string;
  referenciaInterna: string;
  precioUnitario: number;
  estado: string;
  unidadMedida: string;
  fechaCreacion: Date;
}