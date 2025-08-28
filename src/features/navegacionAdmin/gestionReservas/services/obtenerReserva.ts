import axios from "axios";
import { Reserva } from "./clases/classReserva";
import type { IDataReserva } from "./clases/classReserva";

const API_URL = "http://localhost:8082/reservas";

export async function obtenerReservas(): Promise<Reserva[]> {
  const response = await axios.get(API_URL);
  // Mapea la respuesta a instancias de Usuario
  return response.data.map(
    (u: { IDReserva: string; DataReserva: IDataReserva }) =>
      new Reserva(u.IDReserva, u.DataReserva)
  );
}
