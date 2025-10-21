export class Pelicula {
    constructor({ 
        id_pelicula = null, 
        nombre, 
        url_portada = null, 
        duracion, 
        director, 
        url_trailer = null, 
        genero, 
        estado_cartelera, 
        fecha_inicio_estreno, 
        fecha_fin_estreno, 
        activo 
    }) {
        this.id_pelicula = id_pelicula;
        this.nombre = nombre;
        this.url_portada = url_portada;
        this.duracion = duracion;
        this.director = director;
        this.url_trailer = url_trailer;
        this.genero = genero;
        this.estado_cartelera = estado_cartelera;
        this.fecha_inicio_estreno = fecha_inicio_estreno;
        this.fecha_fin_estreno = fecha_fin_estreno;
        this.activo = activo;
    }

    asignarId(id) {
        this.id_pelicula = id;
    }
}