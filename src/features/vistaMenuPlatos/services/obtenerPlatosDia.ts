import type { Menu } from "./clases/classMenu";
import type { Plato } from "./clases/classPlato";

// Platos
import adicionales from '../../../assets/imagenesComidas/adicionales/adicionales';
import carta from '../../../assets/imagenesComidas/carta/carta';
import entradas from '../../../assets/imagenesComidas/entradas/entradas';
import segundos from '../../../assets/imagenesComidas/segundos/segundos';
import type { PlatosEnMenuDía } from "./clases/classPlatoMenuDia";


export function capturarPlatosDia(menuDia : Menu, categoria: number) : Plato[]{
    // Imaginemos que tendremos capturado todos los platos del restaurante.
    const platoCatalogo: Plato[] = [...adicionales, ...carta, ...entradas, ...segundos];

    // Ahora devolveremos un array tal que capture todos los que tengan un ID.
    const platos : Plato[] = [];
    const platosMenuDia : PlatosEnMenuDía[] = menuDia.getPlatosDia();
    
    // No le sé a la algoritmia :v
    for(let i = 0; i < platosMenuDia.length; i++){
        for(let j = 0; j < platoCatalogo.length; j++){
            if(platosMenuDia[i].getPlatoId() === platoCatalogo[j].getId()){
                if(platoCatalogo[j].getCategoriaId() === categoria){
                    platos.push(platoCatalogo[j]);
                }
            }
        }
    }
    return platos;
}