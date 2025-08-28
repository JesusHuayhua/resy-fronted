// ClassPlato.ts
export interface IArrPlatoData {
  cantidad_plato: number;
  disponible: boolean;
  id_dia: number;
  id_plato: number;
}

export class ArrPlato {
  cantidad_plato: number;
  disponible: boolean;
  id_dia: number;
  id_plato: number;

  constructor(data: IArrPlatoData) {
    this.cantidad_plato = data.cantidad_plato;
    this.disponible = data.disponible;
    this.id_dia = data.id_dia;
    this.id_plato = data.id_plato;
  }
}
