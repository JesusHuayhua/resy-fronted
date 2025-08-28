import axios from "axios";
import { Reserva, type IDataReserva } from "../../gestionReservas/services/clases/classReserva";

const API_URL = "http://localhost:8082/reservas";

export async function obtenerReservasPorUsuario(idUsuario: number | string): Promise<Reserva[]> {
  const response = await axios.get(API_URL, {
    params: { idCliente: idUsuario },
    headers: { "Content-Type": "application/json" },
  });
  return response.data.map(
    (r: { IDReserva: string; DataReserva: IDataReserva }) =>
      new Reserva(r.IDReserva, r.DataReserva)
  );
}
