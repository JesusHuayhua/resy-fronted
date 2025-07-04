import { obtenerCategorias, type Categoria } from "../services/categoriaMenuService";
import { menuCompletoEspecifico } from "../services/menuCompletoEspecifico";
import { menuTotalidadService, type Menu } from "../services/menuTotalidadService";
import { platosCatalogoService, type Plato } from "../services/platosCatalogoService";

// Estructura que contiene platos con sus cantidades asignadas por día
export interface MenuSemanaCompleto {
    diasConPlatos: {
        dia: number;
        platos: PlatoConCantidadAsignada[];
    }[];
}

// Plato con su cantidad específica asignada para el día
export interface PlatoConCantidadAsignada {
    plato: Plato;
    cantidad: number;
}

// Función para obtener categorías 
export function obtenerCategoriasCompleto(): Promise<Categoria[] | null> {
    return obtenerCategorias();
}

// Obtiene el menú completo de la semana con platos y sus cantidades
export async function obtenerMenuSemanaCompleto(): Promise<MenuSemanaCompleto | null> {
    try {
        // 1. Buscar menú de la semana actual
        const menus = await menuTotalidadService();
        console.log("Menús encontrados:", menus);
        
        if (!menus || menus.length === 0) {
            return null;
        }

        const hoy = new Date();
        const menuSemana = menus.find(menu => {
            const inicio = new Date(menu.fecha_inicio);
            const fin = new Date(menu.fechafin);
            return hoy >= inicio && hoy <= fin;
        });
        
        if (!menuSemana) {
            return null;
        }
        // Ya capturado, procedemos con sacar la información completa de tal menu.

        // 2. Obtener menú completo con días
        const menuCompleto = await menuCompletoEspecifico(menuSemana.id_menu);
        if (!menuCompleto) {
            return null;
        }
        // Capturado, seguimos.

        // 3. Obtener catálogo de platos
        const catalogoPlatos = await platosCatalogoService();
        if (!catalogoPlatos || catalogoPlatos.length === 0) {
            return null;
        }
        // Catálogo completo de platos, ahora construimos el resultado.

        // 4. Construir los días con platos y cantidades
        const diasConPlatos = menuCompleto.dias.map(diaMenu => {
            // Para cada plato del día, buscar su información completa y combinarla con su cantidad
            const platosConCantidad: PlatoConCantidadAsignada[] = diaMenu.platos.map(platoMenu => {
                // Buscar el plato completo en el catálogo
                const platoCompleto = catalogoPlatos.find(plato => plato.IDPlato === platoMenu.id_plato);
                
                if (!platoCompleto) {
                    console.warn(`Plato con ID ${platoMenu.id_plato} no encontrado en catálogo`);
                    return null;
                }
                // Ya tenemos el plato, lo pasamos con su cantidad.
                
                return {
                    plato: platoCompleto,
                    cantidad: platoMenu.cantidad_plato
                };
            }).filter(Boolean) as PlatoConCantidadAsignada[]; // Filtrar los null

            return {
                dia: diaMenu.id_dia,
                platos: platosConCantidad
            };
        });

        return { diasConPlatos };

    } catch (error) {
        console.error("Error en obtenerMenuSemanaCompleto:", error);
        return null;
    }
}

// Función auxiliar para filtrar platos por día
export function filtrarPorDia(menuSemana: MenuSemanaCompleto, dia: number): PlatoConCantidadAsignada[] {
    const diaEncontrado = menuSemana.diasConPlatos.find(d => d.dia === dia);
    return diaEncontrado ? diaEncontrado.platos : [];
}

// Función auxiliar para filtrar platos por categoría
export function filtrarPorCategoria(platos: PlatoConCantidadAsignada[], categoria: number): PlatoConCantidadAsignada[] {
    return platos.filter(platoConCantidad => {
        return platoConCantidad.plato.Info.Categoria === categoria;
    });
}