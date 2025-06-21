import type { Menu } from "./clases/classMenu";
import type { Plato } from "./clases/classPlato";

// Platos
import adicionales from '../../../assets/imagenesComidas/adicionales/adicionales';
import carta from '../../../assets/imagenesComidas/carta/carta';
import entradas from '../../../assets/imagenesComidas/entradas/entradas';
import segundos from '../../../assets/imagenesComidas/segundos/segundos';
import type { PlatosEnMenuDía } from "./clases/classPlatoMenuDia";

// Una tupla
export interface PlatoConDisponibilidad {
    plato: Plato;
    disponible: boolean;
}



export function obtenerPlatosDia(menuDia: Menu, categoria: number): PlatoConDisponibilidad[] {
    const platoCatalogo: Plato[] = [...adicionales, ...carta, ...entradas, ...segundos];

    const platosMenuDia: PlatosEnMenuDía[] = menuDia.getPlatosDia();
    const platosConCantidad: PlatoConDisponibilidad[] = [];

    for (let i = 0; i < platosMenuDia.length; i++) {
        const id = platosMenuDia[i].getPlatoId();

        for (let j = 0; j < platoCatalogo.length; j++) {
            const plato = platoCatalogo[j];

            if (plato.getId() === id && plato.getCategoriaId() === categoria) {
                platosConCantidad.push({
                    plato: plato,
                    disponible: platosMenuDia[i].getDisponible()
                });
                break; // Ya encontramor el plato, vamos al siguiente del MenuDia.
            }
        }
    }

    return platosConCantidad;
}

