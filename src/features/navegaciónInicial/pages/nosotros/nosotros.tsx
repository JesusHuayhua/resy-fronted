import './nosotros.css';
import Header from '../../components/header/header';

function Nosotros() {
  return (
    <>
      <Header />
      <div className="nosotros-bg">
        <h2 className="nosotros-titulo">Nuestra Propuesta</h2>
        <hr className="nosotros-separador" />
        <p className="nosotros-texto">
          Salon Verde rinde homenaje a la comida tradicional limeña. Un espacio familiar que celebra la cocina y su capacidad de adaptarse a los tiempos con alegría. Por eso, nuestra propuesta tiene la generosidad de nuestras abuelas y evoca la dicha de la amistad. Aquí, no importa la edad ni de dónde venga usted. Todos nos sentimos parte de una misma fiesta, en la que no hay tradición más limeña que saborear la felicidad del encuentro.
        </p>
      </div>
    </>
  );
}

export default Nosotros;