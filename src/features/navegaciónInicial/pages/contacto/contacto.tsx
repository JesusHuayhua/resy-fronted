import Header from '../../components/header/header';
import Ubicacion from '../../components/ubicacion/ubicacion';
import './contacto.css';

function Contacto() {
  return (
    <>
      <Header />
      <div className="contacto-container">
        <div className="contacto-left">
          <Ubicacion />
        </div>
        <div className="contacto-right">
          <h2 className="contacto-titulo">Horarios</h2>
          <hr className="contacto-separador" />
          <div className="contacto-horario">
            <span role="img" aria-label="calendario">📅</span> Lunes a Domingo de 10:00 am a 04:00 pm
          </div>
          <h2 className="contacto-titulo">Contactos</h2>
          <hr className="contacto-separador" />
          <div className="contacto-info">
            Si tienes preguntas o comentarios, no dudes en comunicarte con nosotros
          </div>
          <div className="contacto-redes">
            <div><span role="img" aria-label="facebook">📘</span> Salon Verde Restaurante</div>
            <div><span role="img" aria-label="whatsapp">📱</span> +51 921 970 063</div>
            <div><span role="img" aria-label="correo">📧</span> salonverde2020@gmail.com</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contacto;