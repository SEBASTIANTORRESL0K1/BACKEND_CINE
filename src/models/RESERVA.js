export class Reserva {
    constructor({ 
        id_reserva = null, 
        id_asiento, 
        id_cliente, 
        fecha 
    }) {
        this.id_reserva = id_reserva;
        this.id_asiento = id_asiento;
        this.id_cliente = id_cliente;
        this.fecha = fecha;
    }

    asignarId(id) {
        this.id_reserva = id;
    }
}