// src/features/SectorInicio/PantallaInicioSinLogin.tsx
import { PantallaBase } from '../../Components/BaseScreens/PantallaBaseSinLogin';
import Carrusel from './Carrusel';
//importar el css
import './PantallaInicioSinLogin.css';


// Importa las imágenes de manera explícita
import imagen1 from '../../assets/imagenesCarrusel/Imagen1.jpg';
import imagen2 from '../../assets/imagenesCarrusel/Imagen2.jpg';
import imagen3 from '../../assets/imagenesCarrusel/Imagen3.webp';
import imagen4 from '../../assets/imagenesCarrusel/Imagen4.avif';
import imagen5 from '../../assets/imagenesCarrusel/Imagen5.webp';

// Arreglo con las imágenes importadas
const imagenes = [imagen1, imagen2, imagen3, imagen4, imagen5];

const PantallaInicio: React.FC = () => {
    return(
        <PantallaBase>
            <div>
                <img
                    src="/src/assets/logo.webp"
                    alt="Logo"
                    className="logo-sobrepuesto"
                />
                <Carrusel images={imagenes} />

            </div>
        </PantallaBase>
    )
}
export default PantallaInicio;