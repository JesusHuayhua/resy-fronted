import React from "react";
import { useReservation } from '../../../context/ReservationContext';

const ConfirmacionReserva: React.FC<{ onVolver: () => void }> = ({ onVolver }) => {
  const { data } = useReservation();
  return (
    <div className="min-h-screen w-full bg-cover bg-center flex flex-col" >
      <div className="flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-black/60 rounded-xl p-8 max-w-xl w-full relative mt-8">
          <div className="absolute -top-10 left-8 bg-[#c3d600] rounded-full p-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" fill="#c3d600"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12l3 3 5-5" stroke="#222"/></svg>
          </div>
          <h2 className="text-white text-3xl font-bold mb-4 text-center mt-4">Solicitud Confirmada</h2>
          <div className="flex flex-col gap-4 text-white text-lg mb-4">
            <div className="flex items-center gap-2">
              <span className="material-icons">event</span>
              <span>{data.fecha}, {data.hora}h.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-icons">people</span>
              <span>{data.personas} personas.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-icons">location_on</span>
              <span>{data.direccion || 'Jr. Costa Azul c/ Carlos Mellet2'}</span>
            </div>
          </div>
          <div className="bg-white/10 rounded p-4 mb-4">
            <div className="text-white font-bold">Reserva a nombre de: <span className="uppercase">{data.nombres} {data.apellidos}</span></div>
            <div className="text-white mt-2">Se ha realizado su solicitud de reserva exitosamente.</div>
            <div className="text-white mt-2 text-sm">Revisar por favor su correo (<span className="underline">{data.email}</span>) para mayor detalle</div>
          </div>
          <button onClick={onVolver} className="block mx-auto mt-4 bg-[#c3d600] text-white font-bold py-3 px-8 rounded-xl text-xl hover:bg-[#b0c000] transition-all">Volver al Inicio</button>
        </div>
        <footer className="w-full flex justify-between text-xs text-white mt-8 px-2">
          <a href="#" className="underline">Términos y condiciones</a>
          <a href="#" className="underline">Política y privacidad</a>
        </footer>
      </div>
    </div>
  );
};

export default ConfirmacionReserva;
