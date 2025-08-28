import axios from "axios";
import { Reserva } from "./clases/classReserva";

const API_URL = "http://localhost:8082/reservas";

export async function obtenerReservas(): Promise<Reserva[]> {
  const response = await axios.get(API_URL);
  return response.data.map(
    (r: { IDReserva: string; DataReserva: any }) =>
      new Reserva(r.IDReserva, r.DataReserva)
  );
}
