export class Sala {
    constructor({ id_sala = null, id_cine, numero_sala }) {
        this.id_sala = id_sala;
        this.id_cine = id_cine;
        this.numero_sala = numero_sala;
    }

    asignarId(id) {
        this.id_sala = id;
    }
}