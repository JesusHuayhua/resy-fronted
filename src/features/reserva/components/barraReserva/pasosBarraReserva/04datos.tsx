import React, { useState } from 'react';

interface Step4TusDatosProps {
  onBack: () => void;
}

const Step4TusDatos: React.FC<Step4TusDatosProps> = ({ onBack }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes recopilar todos los datos del wizard (personas, fecha, hora, datos)
    // y enviarlos a tu backend o manejarlos como sea necesario.
    console.log('Datos finales:', { name, email });
    alert('Reserva completada!');
    // Podrías redirigir al usuario o resetear el wizard aquí
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4">Paso 4: Tus Datos</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-lg font-medium mb-2">
          Nombre completo:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block text-lg font-medium mb-2">
          Correo electrónico:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-300 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-400 transition-colors"
        >
          Atrás
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors"
        >
          Confirmar Reserva
        </button>
      </div>
    </form>
  );
};

export default Step4TusDatos;