import img1 from './Arroz Chaufa con Mariscos.avif';
import img2 from './Ceviche De Pescado.avif';
import img3 from './Duo Marino.avif';
import img4 from './Jalea Mixta.avif';
import img5 from './Trio Marino.avif';
import { Plato } from '../../../features/vistaMenuPlatos/services/clases/classPlato.ts';

// Crearemos platos con información genérica
const carta: Plato[] = [
    new Plato("Arroz Chaufa con Mariscos", "Delicioso arroz chaufa con mariscos frescos", 25, true, 2, img1),
    new Plato("Ceviche de Pescado", "Pescado fresco marinado en limón con acompañamientos", 22, true, 2, img2),
    new Plato("Duo Marino", "Combinación de ceviche y chicharrón de pescado", 30, true, 2, img3),
    new Plato("Jalea Mixta", "Crujiente mezcla de mariscos fritos con salsa criolla", 28, true, 2, img4),
    new Plato("Trío Marino", "Ceviche, chicharrón de pescado y arroz con mariscos", 35, true, 2, img5),
];

export default carta;
