export class Venta {
    constructor({ 
        id_venta = null, 
        id_cliente, 
        fecha_hora, 
        total 
    }) {
        this.id_venta = id_venta;
        this.id_cliente = id_cliente;
        this.fecha_hora = fecha_hora;
        this.total = total;
    }

    asignarId(id) {
        this.id_venta = id;
    }
}