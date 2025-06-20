import React, { useState } from 'react';

interface Step3HoraProps {
  onNext: () => void;
  onBack: () => void;
}

const Step3Hora: React.FC<Step3HoraProps> = ({ onNext, onBack }) => {
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Hora seleccionada:', selectedTime);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4">Paso 3: Elige la hora</h2>
      <label htmlFor="hora" className="block text-lg font-medium mb-2">
        Hora:
      </label>
      <input
        type="time"
        id="hora"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        className="border border-gray-300 p-2 rounded-md w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
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
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};

export default Step3Hora;