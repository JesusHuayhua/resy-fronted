import adicionales from '../../../assets/imagenesComidas/adicionales/adicionales';
import carta from '../../../assets/imagenesComidas/carta/carta';
import entradas from '../../../assets/imagenesComidas/entradas/entradas';
import segundos from '../../../assets/imagenesComidas/segundos/segundos';
import { Menu, DiaSemana } from './clases/classMenu';
import { PlatosEnMenuDía } from './clases/classPlatoMenuDia';

// Está función será un Promise, de tal manera que se ejecutará cada vez que se le invoca.
// Digo promise puesto que 
// Esto para mostrarlo en el catálogo.

// Crearemos menús de lunes y martes (por pereza realmente :v)
// Todos fueron seleccionados de forma arbitraria. Habrán algunas que no tendrán cantidad, otras sí.

export async function obtenerMenuSemanal(){
    const platosMenuLunes : PlatosEnMenuDía[] = [
        new PlatosEnMenuDía(adicionales[0].getId(), 0),
        new PlatosEnMenuDía(carta[1].getId(), 1),
        new PlatosEnMenuDía(carta[2].getId(), 5),
        new PlatosEnMenuDía(entradas[3].getId(), 5),
        new PlatosEnMenuDía(entradas[1].getId(), 3),
        new PlatosEnMenuDía(segundos[1].getId(), 5),
        new PlatosEnMenuDía(segundos[0].getId(), 5),
    ];

    const platosMenuMartes : PlatosEnMenuDía[] = [
        new PlatosEnMenuDía(adicionales[2].getId(), 5),
        new PlatosEnMenuDía(carta[1].getId(), 0),
        new PlatosEnMenuDía(carta[3].getId(), 5),
        new PlatosEnMenuDía(entradas[3].getId(), 2),
        new PlatosEnMenuDía(entradas[1].getId(), 5),
        new PlatosEnMenuDía(segundos[1].getId(), 2),
        new PlatosEnMenuDía(segundos[0].getId(), 3),
        new PlatosEnMenuDía(segundos[2].getId(), 0),
        new PlatosEnMenuDía(segundos[3].getId(), 0),
        new PlatosEnMenuDía(segundos[4].getId(), 0),
        new PlatosEnMenuDía(segundos[5].getId(), 5),
    ];




    // 1) Se define los platos a preparar.
    // Menu está preparado para capturar un menu NULL, pero neh.
    // Tomar en cuenta que los objetos menú solo tienen conocimiento de los IDS de los platos, pero NO del plato mismo.
    // Se tiene que realizar búsqueda.
    const menuLunes = new Menu(DiaSemana.Lunes, platosMenuLunes);
    const menuMartes = new Menu(DiaSemana.Martes, platosMenuMartes);
    const menuMiercoles = new Menu(DiaSemana.Miércoles, []);
    const menuJueves = new Menu(DiaSemana.Jueves, []);
    const menuViernes = new Menu(DiaSemana.Viernes, []);
    const menuSabado = new Menu(DiaSemana.Sábado, []);
    const menuDomingo = new Menu(DiaSemana.Domingo, []);

    // Ahora realizaremos un catálogo del menú completo de la semana,

    // Ojo, esto es solo una simulación. En esta función se capturará el menú semanal.
    const menuSemanal: Menu[] = [menuLunes, menuMartes, menuMiercoles, menuJueves, menuViernes, menuSabado, menuDomingo];


    return menuSemanal;
}


