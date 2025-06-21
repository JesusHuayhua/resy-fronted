
import { Menu } from './clases/classMenu';
import { obtenerPlatosDia } from './obtenerPlatosDia';

// En este apartado se recibirá como parámetro el menú semanal, sumado de un valor del usuario (el día como filtro).
// 
import type { PlatoConDisponibilidad } from'./obtenerPlatosDia'
export function obtenerMenuDia(menuSemanal: Menu[], dia: string, categoria: number): PlatoConDisponibilidad[] {
    const menuDia: Menu | undefined = menuSemanal.find(menu => menu.getDia() === dia);
    const platos = menuDia ? obtenerPlatosDia(menuDia, categoria) : [];
    return platos;
}
