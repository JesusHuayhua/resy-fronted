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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.898943227073!2d-77.021!3d-12.185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7e6b6e3b6b7%3A0x8e2e9e6e6e6e6e6!2sSal%C3%B3n%20Verde%20Cevicheria%20-%20Restaurante!5e0!3m2!1ses!2spe!4v1718030000000"
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