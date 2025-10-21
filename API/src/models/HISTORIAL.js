export class Historial {
    constructor({ 
        id_historial = null, 
        id_usuario = null, 
        fecha_hora = new Date(), 
        ip = null, 
        tipo_movimiento, 
        descripcion = null, 
        tabla_afectada = null, 
        id_registro_afectado = null, 
        exito = true, 
        origen = null 
    }) {
        this.id_historial = id_historial;
        this.id_usuario = id_usuario;
        this.fecha_hora = fecha_hora;
        this.ip = ip;
        this.tipo_movimiento = tipo_movimiento;
        this.descripcion = descripcion;
        this.tabla_afectada = tabla_afectada;
        this.id_registro_afectado = id_registro_afectado;
        this.exito = exito;
        this.origen = origen;
    }

    asignarId(id) {
        this.id_historial = id;
    }
}