import './home.css'
import Header from '../../components/header/header'
import HeaderLogged from '../../components/header/HeaderLogged';
import Carrusel from '../../components/carrusel/carrusel'
import { useUser } from '../../../user/context/UserContext'

function Home() {
  const { user } = useUser();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="relative z-20">
        {user ? <HeaderLogged /> : <Header />}
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-white">
        <Carrusel />
      </main>

    </div>
  )
}

export default Home
