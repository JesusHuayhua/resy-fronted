import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt, FaSearchLocation } from 'react-icons/fa';

const direccionesSugeridas = [
  {
    dir: 'Antonio Garland Grana 180-248',
    extra: 'Dejar en recepción',
    ciudad: 'Lima, Peru',
    coords: { lat: -12.174801, lng: -77.016396 },
  },
  {
    dir: 'Jr. Oscar Pomar 132-1°B',
    extra: 'Dejar en recepción',
    ciudad: 'Lima, Peru',
    coords: { lat: -12.175200, lng: -77.016800 },
  },
  {
    dir: 'C. Lizandro de la Puente',
    extra: 'Dejar en recepción',
    ciudad: 'Lima, Peru',
    coords: { lat: -12.174500, lng: -77.015900 },
  },
];

// Icono personalizado para el marcador
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [32, 48],
  iconAnchor: [16, 48],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  shadowSize: [48, 48],
});

function LocationSelector({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e: any) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const UbicacionEnvio: React.FC = () => {
  const [direccion, setDireccion] = useState('');
  const [seleccionada, setSeleccionada] = useState<number | null>(null);
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>({ lat: -12.174801, lng: -77.016396 });
  const [customLocation, setCustomLocation] = useState(false);
  const [reverseAddress, setReverseAddress] = useState('');
  const mapRef = useRef<any>(null);
  const initialPosition = { lat: -12.174801, lng: -77.016396 };

  // Cuando se selecciona una dirección sugerida
  const handleSeleccionarDireccion = (idx: number) => {
    setSeleccionada(idx);
    setCustomLocation(false);
    setMarker(direccionesSugeridas[idx].coords);
    setDireccion(direccionesSugeridas[idx].dir);
    setReverseAddress('');
    if (mapRef.current) {
      mapRef.current.setView(direccionesSugeridas[idx].coords, 19);
    }
  };

  // Cuando se selecciona en el mapa
  const handleMapSelect = async (lat: number, lng: number) => {
    setMarker({ lat, lng });
    setSeleccionada(null);
    setCustomLocation(true);
    setDireccion('');
    // Reverse geocoding con Nominatim
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      if (data && data.display_name) {
        setDireccion(data.display_name);
        setReverseAddress(data.display_name);
      } else {
        setReverseAddress('');
      }
    } catch (error) {
      setReverseAddress('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/80 relative">
      {/* Fondo de imagen */}
      <img
        src="/src/assets/imagenesReserva/fachada.webp"
        alt="Fondo restaurante"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'brightness(0.6)' }}
      />
      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl shadow-2xl p-0 flex flex-col items-center bg-black/90 border border-gray-700">
        {/* Título limpio y pegado */}
        <div className="w-full flex justify-center">
          <h1 className="w-full text-4xl font-extrabold text-white text-center tracking-wider bg-black rounded-t-2xl px-10 py-3 mb-2 shadow-lg border-b-2 border-black">UBICACION DE ENVIO</h1>
        </div>
        {/* Input de dirección */}
        <div className="w-full px-8 mt-2 mb-1">
          <label className="block text-white text-sm mb-1 font-semibold">Ingresa una nueva dirección</label>
          <div className="relative flex items-center">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-amber-400 pr-10 text-base"
              placeholder="Ej: Urb Santa Leonor Etapa 1"
              value={direccion}
              onChange={e => { setDireccion(e.target.value); setSeleccionada(null); setCustomLocation(false); setReverseAddress(''); }}
            />
            <FaSearchLocation className="absolute right-3 text-gray-400 text-xl" />
          </div>
        </div>
        {/* Direcciones sugeridas */}
        <div className="w-full px-8 space-y-2 mb-2">
          {direccionesSugeridas.map((item, idx) => (
            <div key={idx} className={`flex items-center rounded-md overflow-hidden bg-[#222] border border-gray-700 ${seleccionada === idx ? 'ring-2 ring-amber-400' : ''}`}>
              <div className="flex-1 px-4 py-2 text-white text-sm">
                <div className="font-semibold text-base">{item.dir}</div>
                <div className="text-xs text-gray-300">{item.extra}</div>
                <div className="text-xs text-gray-400">{item.ciudad}</div>
              </div>
              <button
                className={`px-4 py-2 text-sm font-semibold rounded-none transition-all duration-200 ${seleccionada === idx ? 'bg-amber-400 text-black' : 'bg-lime-300/90 text-black hover:bg-lime-400'}`}
                onClick={() => handleSeleccionarDireccion(idx)}
              >
                Seleccionar
              </button>
            </div>
          ))}
        </div>
        {/* Botones */}
        <div className="w-full flex flex-row gap-2 px-8 mb-2 mt-2">
          <button className="flex-1 bg-yellow-400 text-black font-bold py-2 rounded-lg hover:bg-yellow-500 transition flex items-center justify-center gap-2 text-base shadow">
            <FaMapMarkerAlt className="text-lg" />
            Seleccionar En El Mapa
          </button>
          <button className="flex-1 bg-orange-400 text-white font-bold py-2 rounded-lg hover:bg-orange-500 transition text-base shadow">
            Compartir Ubicación
          </button>
        </div>
        {/* Mapa interactivo (más grande) */}
        <div className="w-full flex justify-center px-8 pb-8 pt-2">
          <div className="w-[500px] h-[350px] rounded-xl overflow-hidden shadow-lg border-2 border-gray-700 bg-white">
            <MapContainer
              center={marker ? [marker.lat, marker.lng] : [initialPosition.lat, initialPosition.lng]}
              zoom={19}
              scrollWheelZoom={true}
              className="w-full h-full z-10"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationSelector onSelect={handleMapSelect} />
              {marker && <Marker position={[marker.lat, marker.lng]} />}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UbicacionEnvio; 
