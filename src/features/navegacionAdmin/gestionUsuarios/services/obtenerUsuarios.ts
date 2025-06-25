import axios from "axios";
import { Usuario } from "./clases/classUsuario";
import type { IDataUsuario } from "./clases/classUsuario";

const API_URL = "http://localhost:8080/usuarios";

export async function obtenerUsuarios(): Promise<Usuario[]> {
  const response = await axios.get(API_URL);
  // Mapea la respuesta a instancias de Usuario
  return response.data.map(
    (u: { IdUsuario: number; DataUsuario: IDataUsuario }) =>
      new Usuario(u.IdUsuario, u.DataUsuario)
  );
}
