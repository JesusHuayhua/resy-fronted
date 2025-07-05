import React, { useState } from 'react';
import { ReservationProvider, useReservation } from '../../context/ReservationContext';
import BackgroundImg from '../../../../assets/imagenesReserva/mesas.webp'
import Logo from '../../../../assets/logo.webp';
import QR from '../../../../assets/imagenesReserva/qr_resi.jpg';
import YAPE from '../../../../assets/imagenesReserva/yape_logo.png';

const ReservaForm = () => {
  const { setData } = useReservation();
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    direccion: '',
    platosElegir: '',
    sugerencias: ''
  });
  const [showPopup, setShowPopup] = useState(false);
  const [showYape, setShowYape] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setData({ [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setData(formData);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowYape(false);
    setShowCard(false);
    setShowConfirm(false);
  };

  return (
    <div className="flex items-center justify-center p-4 w-full h-full min-h-screen" style={{ backgroundImage: `url(${BackgroundImg})`, backgroundPosition: 'center' }}>
      <div className="w-full max-w-2xl px-4 mt-16 mb-8">
        <form onSubmit={handleSubmit}>
        {/* Formulario Principal */}
        <div className="rounded-lg p-10 shadow-2xl" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <h2 className="text-4xl font-bold text-white mb-3">Tus Datos</h2>
          <div className="w-full h-0.5 bg-white mb-10"></div>
          <div className="space-y-8">
            {/* Campos Obligatorios */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Campos Obligatorios</h3>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Nombres</label>
                <input type="text" name="nombres" value={formData.nombres} onChange={handleInputChange} required className="w-full px-6 py-4 bg-white rounded-md border-0 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200 text-lg" placeholder="Ingresa tu nombre" />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Apellidos</label>
                <input type="text" name="apellidos" value={formData.apellidos} onChange={handleInputChange} required className="w-full px-6 py-4 bg-white rounded-md border-0 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200 text-lg" placeholder="Ingresa tus apellidos" />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Número de teléfono</label>
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} required className="w-full px-6 py-4 bg-white rounded-md border-0 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200 text-lg" placeholder="Ingresa tu teléfono" />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Correo electrónico</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-6 py-4 bg-white rounded-md border-0 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200 text-lg" placeholder="Ingresa tu email" />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-white rounded-md border-0 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200 text-lg"
                  placeholder="Ingresa tu dirección"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Platos a elegir
                </label>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-white rounded border-2 border-gray-300">
                    <span className="text-gray-600 font-mono text-sm">📄</span>
                  </div>
                  <div className="bg-white px-4 py-3 rounded-md font-mono text-gray-600 text-sm">
                    $XX.X
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Campos No Obligatorios */}
        <div className="rounded-lg p-10 shadow-2xl mt-8" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <h3 className="text-xl font-semibold text-white mb-6">Campos No Obligatorios</h3>
          <div className="mb-8">
            <label className="block text-white text-base font-medium mb-3">¿Algo que debamos tomar en cuenta?</label>
            <textarea name="sugerencias" value={formData.sugerencias} onChange={handleInputChange} rows={5} className="w-full px-6 py-4 bg-white rounded-md border-0 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200 resize-none text-lg" placeholder="Sugerencias: Alergias, preferencias dietéticas, etc." />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold py-5 px-8 rounded-md hover:from-amber-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-lg">
            REALIZAR EL PAGO
          </button>
        </div>
        </form>
        {/* Popup de medios de pago */}
        {showPopup && !showYape && !showCard && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
            <div className="bg-gray-200 rounded-2xl shadow-2xl p-12 flex flex-col items-center relative min-w-[420px] min-h-[320px]" onClick={e => e.stopPropagation()}>
              <button onClick={handleClosePopup} className="absolute top-3 right-4 text-gray-500 hover:text-black text-3xl font-bold" aria-label="Cerrar">×</button>
              <h2 className="text-2xl font-semibold text-indigo-700 mb-8 text-center">Seleccione un medio de pago:</h2>
              <div className="flex justify-center items-center gap-12 bg-gray-100 py-8 px-4 rounded-xl w-full">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-20 w-auto cursor-pointer" onClick={() => setShowCard(true)} />
                <img src={YAPE} alt="Yape" className="h-20 w-auto bg-[#6C2184] rounded p-2 cursor-pointer" onClick={() => setShowYape(true)} />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-20 w-auto cursor-pointer" onClick={() => setShowCard(true)} />
              </div>
            </div>
          </div>
        )}
        {/* Popup Yape */}
        {showPopup && showYape && !showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl flex flex-col items-center relative w-[430px]" onClick={e => e.stopPropagation()}>
              <div className="w-full flex items-center justify-between bg-[#222] rounded-t-2xl p-3">
                <img src={Logo} alt='Salon Verde' className='h-10' />
                <button onClick={handleClosePopup} className="text-white text-3xl font-bold" aria-label="Cerrar">×</button>
              </div>
              <div className="w-full bg-gray-200 py-2 px-4 text-left text-sm flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-400 border border-gray-400"></span>
                Pago con Yape en línea
              </div>
              <div className="flex flex-col items-center bg-[#6C2184] w-full py-8 px-2 min-h-[320px]">
                <img src={QR} alt="QR Yape" className="h-56 w-56 bg-white rounded-lg" />
                <span className="text-white mt-4 text-lg">SALÓN VERDE</span>
              </div>
              <button className="w-full bg-[#c3d600] text-white font-bold py-4 text-xl rounded-b-2xl hover:bg-[#b0c000] transition-all" onClick={() => setShowConfirm(true)}>
                TOTAL A PAGAR: S/XXX.XX
              </button>
            </div>
          </div>
        )}
        {/* Popup Tarjeta */}
        {showPopup && showCard && !showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl flex flex-col items-center relative w-[430px]" onClick={e => e.stopPropagation()}>
              <div className="w-full flex items-center justify-between bg-[#222] rounded-t-2xl p-3">
                <img src={Logo} alt='Salon Verde' className='h-10' />
                <button onClick={handleClosePopup} className="text-white text-3xl font-bold" aria-label="Cerrar">×</button>
              </div>
              <div className="w-full bg-gray-200 py-2 px-4 text-left text-sm flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-400 border border-gray-400"></span>
                Pago con Tarjeta de Credito
              </div>
              <div className="w-full bg-gray-400 flex flex-col items-center py-4 px-2">
                <span className="text-center text-black text-sm mb-2">Recuerda activar las compras<br/>por internet con tu banco</span>
                <input type="text" placeholder="Número de Tarjeta" className="w-11/12 my-1 px-4 py-2 rounded bg-gray-200 placeholder-gray-500 text-base" />
                <div className="flex w-11/12 gap-2 my-1">
                  <input type="text" placeholder="MM/AA" className="w-1/2 px-4 py-2 rounded bg-gray-200 placeholder-gray-500 text-base" />
                  <input type="text" placeholder="CVV" className="w-1/2 px-4 py-2 rounded bg-gray-200 placeholder-gray-500 text-base" />
                </div>
                <div className="flex w-11/12 gap-2 my-1">
                  <input type="text" placeholder="Nombres" className="w-1/2 px-4 py-2 rounded bg-gray-200 placeholder-gray-500 text-base" />
                  <input type="text" placeholder="Apellidos" className="w-1/2 px-4 py-2 rounded bg-gray-200 placeholder-gray-500 text-base" />
                </div>
                <input type="email" placeholder="Correo Electrónico" className="w-11/12 my-1 px-4 py-2 rounded bg-gray-200 placeholder-gray-500 text-base" />
                <button className="w-11/12 mt-4 mb-2 bg-[#c3d600] text-white font-bold py-3 rounded-lg text-xl hover:bg-[#b0c000] transition-all" onClick={() => setShowConfirm(true)}>
                  Pagar S/ XX.XX
                </button>
                <div className="flex flex-row items-center justify-center gap-4 mt-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-8 w-auto" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8 w-auto" />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Popup Confirmación */}
        {showPopup && showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
            <div className="bg-gray-200 rounded-2xl shadow-2xl flex flex-col items-center relative w-[430px]" onClick={e => e.stopPropagation()}>
              <div className="w-full flex items-center justify-between bg-[#222] rounded-t-2xl p-3">
                <img src={Logo} alt='Salon Verde' className='h-10' />
                <button onClick={handleClosePopup} className="text-white text-3xl font-bold" aria-label="Cerrar">×</button>
              </div>
              <div className="flex flex-col items-center w-full px-6 py-8">
                <div className="bg-black rounded-full p-4 mb-4"><svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='white'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' /></svg></div>
                <h2 className="text-2xl font-bold mb-2">¡GRACIAS!</h2>
                <p className="text-lg mb-2 text-center">Hemos procesado tu pago<br/>exitosamente</p>
                <hr className="w-full border-black my-4" />
                <div className="text-center mb-2">
                  <div className="text-lg">Código de la reserva</div>
                  <div className="text-2xl font-semibold">XYZ123456</div>
                  <div className="mt-2 text-base">Total</div>
                  <div className="text-2xl font-bold">S/XXX.XX</div>
                </div>
                <button className="mt-6 w-full bg-[#c3d600] text-white font-bold py-3 rounded-xl text-xl hover:bg-[#b0c000] transition-all" onClick={handleClosePopup}>
                  Volver
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PedidoReserva = () => (
  <ReservationProvider>
    <ReservaForm />
  </ReservationProvider>
);

export default PedidoReserva;
