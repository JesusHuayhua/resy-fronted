import './home.css'
import Header from '../../components/header/header'
import Carrusel from '../../components/carrusel/carrusel'

function Home() {
  return (
    <div className="home-bg">
      <main className="main-content">
        <Header />
        <Carrusel />
        <div className="logo-section">
          <h1 className="logo-title">Salon Verde</h1>
          <div className="logo-subtitle">Cevichería - Restaurante</div>
        </div>
        <div className="slider-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="slider-footer">
          <span>Ambientes</span>
          <span className="reclamaciones-link">Libro de reclamaciones</span>
        </div>
      </main>
    </div>
  )
}

export default Home
