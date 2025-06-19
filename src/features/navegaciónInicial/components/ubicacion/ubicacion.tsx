import './ubicacion.css';

const Ubicacion = () => (
  <div className="ubicacion-section">
    <h2 className="ubicacion-titulo">Ubicación</h2>
    <hr className="ubicacion-separador" />
    <div className="ubicacion-direccion">
      Jr. Costa Azul c/ Carlos Mellet - (Mellet F1-Lt 2) - CHORRILLOS, Lima, Peru
    </div>
    <div className="ubicacion-mapa">
      <iframe
        title="Mapa Salon Verde"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d359.9839826442235!2d-77.01673978603094!3d-12.174812250121695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b778ae9ee7f1%3A0x1b6af882865318a9!2sSal%C3%B3n%20Verde%20Cevicheria%20-%20Restaurante!5e0!3m2!1ses!2spe!4v1749670318875!5m2!1ses!2spe"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
);

export default Ubicacion;