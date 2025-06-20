import axios from 'axios';

const API_URL = 'http://localhost:8080/usuarios'; // Asegúrate de incluir http://

export interface RegisterData {
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  direccion: string;
  fechanacimiento: string;
  contrasenia: string;
  estadoacceso: boolean;
}

export interface RegisterResponse {
  status: number;
}

export async function register(data: RegisterData): Promise<RegisterResponse> {
  const payload = {
    ...data,
    rol: 1
  };
  // Axios envía como JSON por defecto, pero puedes ser explícito:
  const response = await axios.post<RegisterResponse>(
    API_URL,
    payload,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      // withCredentials: true, // Descomenta si tu backend requiere cookies/sesión
    }
  ); // <-- Aquí se usa POST
  return response.data;
}
