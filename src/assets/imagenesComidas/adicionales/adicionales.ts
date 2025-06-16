import img1 from './Chicha1L.avif';
import img2 from './Maracuya1L.avif';
import img3 from './PorcionArroz.avif';
import img4 from './PorcionHuevo.avif';
import img5 from './PorcionWantan.avif';
import { Plato } from '../../../features/vistaMenuPlatos/services/clases/classPlato.ts';

// Crearemos platos con información genérica
const adicionales: Plato[] = [
    new Plato("Chicha Morada 1L", "Bebida refrescante de maíz morado", 10, true, 3, img1),
    new Plato("Maracuyá 1L", "Bebida cítrica y natural", 10, true, 3, img2),
    new Plato("Porción de Arroz", "Acompañamiento clásico para cualquier plato", 5, true, 3, img3),
    new Plato("Porción de Huevo", "Huevo cocido, perfecto para complementar comidas", 3, true, 3, img4),
    new Plato("Porción de Wantán", "Crujientes piezas de masa rellena", 7, true, 3, img5),
];

export default adicionales;
