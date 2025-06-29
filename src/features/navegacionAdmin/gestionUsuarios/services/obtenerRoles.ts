import axios from "axios";
import { Rol, type IDataRol } from "./clases/classRol";

const API_URL = "http://localhost:8080/roles";

export async function obtenerRoles(): Promise<Rol[]> {
  try {
    console.log("Solicitando Roles a:", API_URL);
    const response = await axios.get(API_URL, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data.map(
      (r: { ID: number; DataRol: IDataRol }) => new Rol(r.ID, r.DataRol)
    );
  } catch (error: any) {
    // Log completo para depuración
    if (error.response) {
      console.error("Error al obtener roles:", error.response.status, error.response.data);
    } else {
      console.error("Error al obtener roles:", error);
    }
    throw error;
  }
}
