import type { IMenuData } from './classMenu'; // Solo tipos
import { Menu } from './classMenu'; 

import type { IDiaMenuData } from './classDiaMenu';
import { DiaMenu  } from './classDiaMenu';

import { ArrPlato } from './classArregloPlato'

export interface IMenuCompletoData extends IMenuData {
  dias: IDiaMenuData[] | null; // Permitir null explícitamente
}

export class MenuCompleto extends Menu {
  private dias: DiaMenu[];

  constructor(data: IMenuCompletoData) {
    super(data); // inicializa fecha_inicio, fechafin, id_menu
    
    // Validar que dias no sea null o undefined antes de hacer map
    if (data.dias && Array.isArray(data.dias)) {
      this.dias = data.dias.map(d => new DiaMenu(d));
    } else {
      //console.warn('⚠️ MenuCompleto: data.dias es null, undefined o no es un array:', data.dias);
      this.dias = []; // Inicializar como array vacío
    }
  }

  getDias(): DiaMenu[] {
    return this.dias;
  }

  getDiaPorNombre(nombre: string): DiaMenu | undefined {
    return this.dias.find(d => d.dia_semana.toLowerCase() === nombre.toLowerCase());
  }

  getPlatosDelDia(id_dia: number): ArrPlato[] {
    const dia = this.dias.find(d => d.id_dia === id_dia);
    return dia ? dia.platos : [];
  }
}