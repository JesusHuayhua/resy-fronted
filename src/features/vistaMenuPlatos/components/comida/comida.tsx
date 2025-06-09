import type { Plato } from "../../services/clases/classPlato"
import "./comida.css"
// Declarar siempre un interface Props pa que TS no se loquee :v
interface Props{
    plato : Plato;
}

function Comida(){
    // Se obtiene el plato a renderizar.
    return (
        <div className="food-card">
            <div className="image-container">
                <img src="ruta-de-la-imagen" alt="Nombre del plato" className="food-image" />
            </div>
            <div className="content-container">
                <p className="description">
                La causa rellena es un plato típico de la gastronomía peruana, particularmente popular en la región costera. Se trata de un puré frío a base de papa amarilla, que se sazona con ají amarillo, limón, aceite y sal. El relleno consiste en pollo desmenuzado y verduras, acompañados de mayonesa. Decorado con huevos, aceitunas, perejil y palta. Es un plato servido como entrada.
                </p>
                <div className="bottom-info">
                    <div className="price-container">
                        <div className="price-icon">S/</div>
                        <span className="price">4.50</span>
                    </div>
                    <div className="status disponible">DISPONIBLE</div>
                </div>
            </div>
        </div>
    )
}

export default Comida;