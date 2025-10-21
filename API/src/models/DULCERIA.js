export class Dulceria {
    constructor({ 
        id_dulce = null, 
        nombre, 
        tamano = null, 
        tipo, 
        id_categoria_dulceria, 
        precio 
    }) {
        this.id_dulce = id_dulce;
        this.nombre = nombre;
        this.tamano = tamano;
        this.tipo = tipo;
        this.id_categoria_dulceria = id_categoria_dulceria;
        this.precio = precio;
    }

    asignarId(id) {
        this.id_dulce = id;
    }
}