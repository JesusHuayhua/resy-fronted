import axios from "axios";
import { Rol, type IDataRol } from "./clases/classRol";

const API_URL = "http://localhost:8080/roles";

export async function obtenerRoles(): Promise<Rol[]> {
  const response = await axios.get(API_URL);
  // Mapea la respuesta a instancias de Rol
  return response.data.map(
    (r: { ID: number; DataRol: IDataRol }) => new Rol(r.ID, r.DataRol)
  );
}
