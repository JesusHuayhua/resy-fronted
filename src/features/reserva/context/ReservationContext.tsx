import React, { createContext, useContext, useState } from 'react';

export interface ReservationData {
  personas: number;
  fecha: string;
  hora: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  email: string;
  platosElegir?: string;
  sugerencias?: string;
  direccion?: string;
}

interface ReservationContextProps {
  data: ReservationData;
  setData: (data: Partial<ReservationData>) => void;
  reset: () => void;
}

const ReservationContext = createContext<ReservationContextProps | undefined>(undefined);

const defaultData: ReservationData = {
  personas: 1,
  fecha: '',
  hora: '',
  nombres: '',
  apellidos: '',
  telefono: '',
  email: '',
  platosElegir: '',
  sugerencias: '',
  direccion: '',
};

export const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setReservationData] = useState<ReservationData>(defaultData);

  const setData = (newData: Partial<ReservationData>) => {
    setReservationData((prev) => ({ ...prev, ...newData }));
  };

  const reset = () => setReservationData(defaultData);

  return (
    <ReservationContext.Provider value={{ data, setData, reset }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error('useReservation debe usarse dentro de ReservationProvider');
  return ctx;
};
