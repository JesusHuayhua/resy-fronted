import img1 from './Causa de Pollo.avif';
import img2 from './Ensalada de Palta.avif';
import img3 from './Sopa Menestron.avif';
import img4 from './Tequeños.avif';
import { Plato } from '../../../features/vistaMenuPlatos/services/clases/classPlato.ts';

// Crearemos platos con información genérica
const entradas: Plato[] = [
    new Plato("Causa de Pollo", "Deliciosa causa rellena con pollo y mayonesa", 12, true, 0, img1),
    new Plato("Ensalada de Palta", "Fresca ensalada con palta, tomate y lechuga", 10, true, 0, img2),
    new Plato("Sopa Menestrón", "Sopa tradicional con verduras y carne", 15, true, 0, img3),
    new Plato("Tequeños", "Crujientes tequeños rellenos de queso", 14, true, 0, img4),
];

export default entradas;
