import type { Menu } from "./clases/classMenu";
import type { Plato } from "./clases/classPlato";
import type { PlatosEnMenuDía } from "./clases/classPlatoMenuDia";

// Imágenes y datos de ejemplo
import adicionales from '../../../assets/imagenesComidas/adicionales/adicionales';
import carta      from '../../../assets/imagenesComidas/carta/carta';
import entradas   from '../../../assets/imagenesComidas/entradas/entradas';
import segundos   from '../../../assets/imagenesComidas/segundos/segundos';

export interface PlatoConDisponibilidad {
  plato: Plato;
  disponible: boolean;
  cantidad: number;
}

export function obtenerPlatosDia(
  menuDia: Menu,
  categoria: number | null
): PlatoConDisponibilidad[] {
  // 1) Construimos el catálogo completo
  const catalogo: Plato[] = [
    ...adicionales,
    ...carta,
    ...entradas,
    ...segundos
  ];

  const platosDia = menuDia.getPlatosDia();
  
  // Lo convertimos en Map
  const disponibilidadMap = new Map<number, PlatosEnMenuDía>(
    platosDia.map(pmd => [pmd.getPlatoId(), pmd])
  );

  // 3) Filtramos el catálogo según:
  //    a) que exista en el menú del día
  //    b) que coincida con la categoría (o categoria === null para "todas")
  return catalogo
    .filter(plato => {
      const datos = disponibilidadMap.get(plato.getId());
      if (!datos) return false;            // No está en el menú
      if (categoria === null) return true; // Todas las categorías
      return plato.getCategoriaId() === categoria;
    })
    .map(plato => {
      const datos = disponibilidadMap.get(plato.getId())!;
      return {
        plato,
        disponible: datos.getDisponible(),
        cantidad:  datos.getCantidad()
      };
    });
}
