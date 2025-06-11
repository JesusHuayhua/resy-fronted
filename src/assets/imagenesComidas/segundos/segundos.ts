import img1 from './Aji de Gallina.avif';
import img2 from './Arroz Chaufa con Carne.avif';
import img3 from './Arroz Chaufa con Pollo.avif';
import img4 from './Carapulcra con Chancho.avif';
import img5 from './Chanfainita con arroz.avif';
import img6 from './Filete de Pollo con Pure.avif';
import img7 from './Lomo Saltado.avif';
import img8 from './Malaya Frita.avif';
import img9 from './Milanesa de Pollo.avif';
import img10 from './Receta-de-Malaya-Frita.avif';
import img11 from './Saltado de Pollo.avif';
import img12 from './Seco de res con frejol.avif';
import img13 from './Tallarin Saltado.avif';
import img14 from './Tallarin verde con Bistec.avif';
import { Plato } from '../../../features/vistaMenuPlatos/services/clases/classPlato.ts';

// Crearemos platos con información genérica
const segundos: Plato[] = [
    new Plato("Ají de Gallina", "Crema de ají amarillo con pollo deshilachado y arroz", 18, true, 1, img1),
    new Plato("Arroz Chaufa con Carne", "Arroz salteado con trozos de carne y verduras", 20, true, 1, img2),
    new Plato("Arroz Chaufa con Pollo", "Arroz salteado con pollo y vegetales", 19, true, 1, img3),
    new Plato("Carapulcra con Chancho", "Guiso de papa seca con carne de cerdo", 22, true, 1, img4),
    new Plato("Chanfainita con Arroz", "Guiso de bofe acompañado de arroz blanco", 15, true, 1, img5),
    new Plato("Filete de Pollo con Puré", "Filete de pollo acompañado de puré de papas", 17, true, 1, img6),
    new Plato("Lomo Saltado", "Trozos de carne salteados con cebolla, tomate y papas fritas", 25, true, 1, img7),
    new Plato("Malaya Frita", "Carne de res frita con acompañamientos", 24, true, 1, img8),
    new Plato("Milanesa de Pollo", "Pollo empanizado y frito, acompañado de arroz", 18, true, 1, img9),
    new Plato("Receta de Malaya Frita", "Versión especial de la malaya frita con especias", 26, true, 1, img10),
    new Plato("Saltado de Pollo", "Pollo salteado con verduras y papas fritas", 20, true, 1, img11),
    new Plato("Seco de Res con Frejol", "Guiso de carne de res con frejoles y arroz", 23, true, 1, img12),
    new Plato("Tallarin Saltado", "Fideos salteados con carne y verduras", 19, true, 1, img13),
    new Plato("Tallarin Verde con Bistec", "Fideos con salsa de albahaca y bistec", 22, true, 1, img14),
];

export default segundos;
