import Header from '../../components/header/header';
import Ubicacion from '../../components/ubicacion/ubicacion';
import './contacto.css';

function Contacto() {
  return (
    <>
      <Header />
      <section className="contacto-container">
        <div className="contacto-left">
          <Ubicacion />
        </div>
        <div className="contacto-right">
          <div className="contacto-card">
            <h2 className="contacto-titulo">🕒 Horarios</h2>
            <p className="contacto-info">Lunes a Domingo: 10:00 am - 04:00 pm</p>
          </div>

          <div className="contacto-card">
            <h2 className="contacto-titulo">📞 Contactos</h2>
            <p className="contacto-info">Si tienes preguntas o comentarios, contáctanos:</p>
            <ul className="contacto-redes">
              <li><span>📘</span> Salon Verde Restaurante</li>
              <li><span>📱</span> +51 921 970 063</li>
              <li><span>📧</span> salonverde2020@gmail.com</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contacto;
