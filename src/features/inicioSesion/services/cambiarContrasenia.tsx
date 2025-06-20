import axios from 'axios';

export async function actualizarPasswordRecuperacion(correo: string, nuevacontrasenia: string) {
  try {
    const response = await axios.post('http://localhost:8080/recuperar/actualizar', {
      correo,
      nuevacontrasenia,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error || 'Error al actualizar la contraseña';
  }
}