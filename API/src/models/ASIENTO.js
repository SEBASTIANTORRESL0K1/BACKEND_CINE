export class Asiento {
    constructor({ id_asiento = null, fila_columna, id_sala }) {
        this.id_asiento = id_asiento;
        this.fila_columna = fila_columna;
        this.id_sala = id_sala;
    }

    asignarId(id) {
        this.id_asiento = id;
    }
}