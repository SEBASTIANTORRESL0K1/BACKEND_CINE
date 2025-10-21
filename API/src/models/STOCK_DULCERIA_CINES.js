export class StockDulceriaCines {
    constructor({ 
        id_stock_dulceria = null, 
        id_cine, 
        id_dulce 
    }) {
        this.id_stock_dulceria = id_stock_dulceria;
        this.id_cine = id_cine;
        this.id_dulce = id_dulce;
    }

    asignarId(id) {
        this.id_stock_dulceria = id;
    }
}