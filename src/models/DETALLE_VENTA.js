export class DetalleVenta {
    constructor({ 
        id_detalle_venta = null, 
        id_venta, 
        cantidad, 
        precio, 
        id_funcion = null, 
        id_asiento = null, 
        id_dulce = null, 
        tipo_item, 
        subtotal 
    }) {
        this.id_detalle_venta = id_detalle_venta;
        this.id_venta = id_venta;
        this.cantidad = cantidad;
        this.precio = precio;
        this.id_funcion = id_funcion;
        this.id_asiento = id_asiento;
        this.id_dulce = id_dulce;
        this.tipo_item = tipo_item;
        this.subtotal = subtotal;
    }

    asignarId(id) {
        this.id_detalle_venta = id;
    }
}