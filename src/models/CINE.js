export class Cine {
    // Usar desestructuración en el constructor lo hace más robusto y legible.
    constructor ({ id_cine = null, nombre_cine, codigo_postal }){
        this.id_cine = id_cine;
        this.nombre_cine = nombre_cine;
        this.codigo_postal = codigo_postal;
    }
    asignarId(id) {
        this.id_cine = id;
    }
}