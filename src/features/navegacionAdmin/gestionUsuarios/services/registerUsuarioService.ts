import axios from "axios";

const API_URL = "http://localhost:8080/usuarios";

export interface RegisterUsuarioData {
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  direccion: string;
  fechanacimiento: string;
  contrasenia: string;
  rol: number;
  estadoacceso: boolean;
}

export interface RegisterUsuarioResponse {
  status: number;
}

export async function registerUsuario(data: RegisterUsuarioData): Promise<RegisterUsuarioResponse> {
  const response = await axios.post<RegisterUsuarioResponse>(API_URL, data, {
    headers: { "Content-Type": "application/json" }
  });
  return response.data;
}
