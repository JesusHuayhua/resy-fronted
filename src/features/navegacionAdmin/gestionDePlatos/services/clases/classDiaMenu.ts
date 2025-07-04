import type { IArrPlatoData } from './classArregloPlato'; // Solo tipos
import { ArrPlato } from './classArregloPlato'; 

export interface IDiaMenuData {
  dia_semana: string;
  id_dia: number;
  id_menu: string;
  platos: IArrPlatoData[] | null; // Permitir null explícitamente
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
    
    // Validar que platos no sea null o undefined antes de hacer map
    if (data.platos && Array.isArray(data.platos)) {
      this.platos = data.platos.map(p => new ArrPlato(p));
    } else {
      //console.warn('⚠️ DiaMenu: data.platos es null, undefined o no es un array:', data.platos);
      this.platos = []; // Inicializar como array vacío
    }
  }
}