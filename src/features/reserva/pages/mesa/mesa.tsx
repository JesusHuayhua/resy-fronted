import BarraReserva from '../../components/barraReserva/barraReserva'
import { ReservationProvider } from '../../context/ReservationContext';


const mesa = () => {
  return (
    <ReservationProvider>
      <BarraReserva />
    </ReservationProvider>
  );
};

export default mesa
