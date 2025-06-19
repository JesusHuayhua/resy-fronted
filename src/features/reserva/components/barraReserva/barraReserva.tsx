import React, { useState } from 'react';
import NavBar from '../header/header';
import "./barraReserva.css";
import { FaUsers,FaCalendarAlt, FaUserEdit } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
interface Step {
  id: number;
  label: string;
  icon: React.ReactNode; // Puedes usar un string para el icono si usas clases (ej. 'fas fa-user')
}

const steps: Step[] = [
  { id: 1, label: 'Personas', icon: <FaUsers/>},
  { id: 2, label: 'Fecha', icon: <FaCalendarAlt/>},
  { id: 3, label: 'Hora', icon: <IoMdTime/>},
  { id: 4, label: 'Tus datos', icon: <FaUserEdit/>},
];

const barraReserva: React.FC = () => {
  const [currentStep] = useState<number>(1); // Inicia en el primer paso
  return (
    <div>
      {/* Tu NavBar se mantiene siempre visible */}
      <NavBar />

      <div className="w-full bg-white p-4 shadow-md">
        <div className="flex justify-around items-center">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col items-center ${
                currentStep === step.id ? 'text-black-600' : 'text-gray-300'
              }`}
            >
            <span  className="text-3xl">{step.icon}</span>
              <span className="text-sm">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default barraReserva;