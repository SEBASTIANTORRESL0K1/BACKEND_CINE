export class Membresia {
    constructor({ id_membresia = null, nombre }) {
        this.id_membresia = id_membresia;
        this.nombre = nombre;
    }

    asignarId(id) {
        this.id_membresia = id;
    }
}