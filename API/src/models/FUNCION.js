export class Funcion {
    constructor({ 
        id_funcion = null, 
        id_sala, 
        id_pelicula, 
        fecha_hora, 
        precio 
    }) {
        this.id_funcion = id_funcion;
        this.id_sala = id_sala;
        this.id_pelicula = id_pelicula;
        this.fecha_hora = fecha_hora;
        this.precio = precio;
    }

    asignarId(id) {
        this.id_funcion = id;
    }
}