import axios from 'axios';

const MENU_ESPECIFICO_API_URL = 'http://localhost:8081/menu/completo?id_menu=';


export interface Plato {
  cantidad_plato: number;
  disponible: boolean;
  id_dia: number;
  id_plato: number;
}

export interface DiaMenu {
  dia_semana: string;
  id_dia: number;
  id_menu: string;
  platos: Plato[];
}

export interface MenuSemanal {
  dias: DiaMenu[];
  fecha_fin: string;        
  fecha_inicio: string;    
  id_menu: string;
}




// Ahora el service que captura la totalidad de un menú completo.
// Su id es por string. Ejemplo del back: "Men1"
export async function menuCompletoEspecifico(id: string): Promise<MenuSemanal | undefined>{
  try {
    const response = await axios.get(MENU_ESPECIFICO_API_URL + id);
    return response.data as MenuSemanal;

  } catch (e){
    console.log(e);
    return undefined;
  }
}