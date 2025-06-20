import axios from 'axios';

const API_URL = 'https://tu-api.com/api/login'; // Cambia esta URL por la de tu backend

export interface LoginResponse {
  token: string;
  user: any;
  // ...otros campos que retorne tu API
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(API_URL, {
    username,
    password,
  });
  return response.data;
}
