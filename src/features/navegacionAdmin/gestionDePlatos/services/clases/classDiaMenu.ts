import type { IArrPlatoData } from './classArregloPlato'; // Solo tipos
import { ArrPlato } from './classArregloPlato'; 

export interface IDiaMenuData {
  dia_semana: string;
  id_dia: number;
  id_menu: string;
  platos: IArrPlatoData[];
}

export class DiaMenu {
  dia_semana: string;
  id_dia: number;
  id_menu: string;
  platos: ArrPlato[];

  constructor(data: IDiaMenuData) {
    this.dia_semana = data.dia_semana;
    this.id_dia = data.id_dia;
    this.id_menu = data.id_menu;
    this.platos = data.platos.map(p => new ArrPlato(p));
  }
}