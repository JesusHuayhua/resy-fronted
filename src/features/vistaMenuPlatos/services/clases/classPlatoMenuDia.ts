
export class PlatosEnMenuDía{
    private platoId : number;
    private cantidad : number;
    private disponible : boolean;

    constructor(platoId: number, cantidad: number){
        this.platoId = platoId;
        this.cantidad = cantidad;
        cantidad === 0 ? this.disponible = true : this.disponible = false;
    }

    public getPlatoId() : number{
        return this.platoId;
    }

    // Se trabajará con estos para el front, ya que cantidad y disponible se utilizarán para el UI.
    // Ojo, No se trabaja 
    public getCantidad() : number{
        return this.cantidad;
    }

    public getDisponible() : boolean{
        return this.disponible;
    }
};