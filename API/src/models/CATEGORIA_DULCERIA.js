export class CategoriaDulceria {
    constructor({ id_categoria_dulceria = null, nombre }) {
        this.id_categoria_dulceria = id_categoria_dulceria;
        this.nombre = nombre;
    }

    asignarId(id) {
        this.id_categoria_dulceria = id;
    }
}