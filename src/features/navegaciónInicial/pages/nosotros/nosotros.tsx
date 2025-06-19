import './nosotros.css'
import Header from '../../components/header/header';

function Nosotros() {
  return (
    <div className="nosotros-container">
      <Header />
      
      <main className="nosotros-main">
        <div className="nosotros-overlay"></div>
        
        <div className="nosotros-content">
          <div className="content-wrapper">
            <h1 className="nosotros-title">Nuestra Propuesta</h1>
            
            <div className="title-divider">
              <div className="divider-line"></div>
            </div>
            
            <div className="nosotros-text">
              <p>
                Salón Verde rinde homenaje a la comida tradicional limeña. Un 
                espacio familiar que celebra la cocina y su capacidad de adaptarse 
                a los tiempos con alegría.
              </p>
              
              <p>
                Por eso, nuestra propuesta tiene la generosidad de nuestras abuelas 
                y evoca la dicha de la amistad. Aquí, no importa la edad ni de dónde 
                venga usted. Todos nos sentimos parte de una misma fiesta, en la que 
                no hay tradición más limeña que saborear la felicidad del encuentro.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Nosotros