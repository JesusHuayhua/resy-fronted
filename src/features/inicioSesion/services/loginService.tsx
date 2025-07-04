import axios from 'axios';

const API_URL = 'http://localhost:8080/login';

export interface LoginResponse {
  acceso: boolean;
  usuario: {
    IdUsuario: number;
    DataUsuario: {
      Nombres: string;
      Apellidos: string;
      Correo: string;
      Telefono: string;
      Direccion: string;
      FechaNacimiento: string;
      Contrasenia: string;
      Rol: number;
      EstadoAcceso: boolean;
    };
  };
}

export async function login(correo: string, contrasenia: string): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(API_URL, {
    correo,
    contrasenia,
  });
  return response.data;
}
