import axios from 'axios';

const MENU_COMPLETO_API_URL = 'http://localhost:8081/menu?';

// Interfaz 
export interface Menu {
  fecha_inicio: string;  // p.ej. "2025-06-24T00:00:00Z"
  fechafin: string;      // Sin guión bajo, tal como viene de la API
  id_menu: string;       // p.ej. "Men1"
}

// Service que captura todo el menú en total.
export async function menuTotalidadService(): Promise<Menu[]> {
  try {
    const response = await axios.get(MENU_COMPLETO_API_URL);
    return response.data as Menu[];
  } catch (e) {
    console.log(e);
    return [];
  }
}

