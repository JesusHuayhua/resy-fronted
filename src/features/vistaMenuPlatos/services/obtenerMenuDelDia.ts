
import { Menu } from './clases/classMenu';
import type { Plato } from './clases/classPlato';
import { capturarPlatosDia } from './obtenerPlatosDia';

// En este apartado se recibirá como parámetro el menú semanal, sumado de un valor del usuario (el día como filtro).
// 
export function obtenerMenuDia(menuSemanal: Menu[], dia: string, categoria: number) : Plato[]{
    // Primero de todos los menús, debemos de sacar aquel que su día corresponda.
    const menuDia: Menu | undefined = menuSemanal.find(menu => menu.getDia() === dia);
    // Ya tenemos el menú del día, ahora se debe de recorrer todos los ids de ese menuDia para capturar los platos.
    // Esos platos se debe de mandar para el UI.
    const platos = menuDia ? capturarPlatosDia(menuDia, categoria) : [];
    // Ya capturado, devolvemos los platos.
    // En caso sea indefinido, el array vacío servirá para mostrar que no hay menú declarado.
    // Devuelve platos filtrados del dia.
    return platos;
}