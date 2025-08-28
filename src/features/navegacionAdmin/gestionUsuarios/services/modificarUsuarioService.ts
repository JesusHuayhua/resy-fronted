import axios from "axios";

const API_URL = "http://localhost:8080/usuarios";

export interface ModificarUsuarioData {
  id: number;
  nombres?: string;
  apellidos?: string;
  correo?: string;
  telefono?: string;
  direccion?: string;
  fechanacimiento?: string;
  contrasenia?: string;
  rol?: number;
  estadoacceso?: boolean;
}

export interface ModificarUsuarioResponse {
  status: number;
}

export async function modificarUsuario(data: ModificarUsuarioData): Promise<ModificarUsuarioResponse> {
  const response = await axios.put<ModificarUsuarioResponse>(API_URL, data, {
    headers: { "Content-Type": "application/json" }
  });
  return response.data;
}
