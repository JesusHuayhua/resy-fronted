import axios from 'axios';

const PLATOS_API_URL = 'http://localhost:8081/platos?';

export interface InfoPlato {
  NombrePlato: string;
  Categoria: number;
  Descripcion: string;
  Precio: number;
  Imagen: string;
  Estado: boolean;
}

export interface Plato {
  IDPlato: number;
  Info: InfoPlato;
}

export async function platosCatalogoService(): Promise<Plato[]>{
    try {
        const response = await axios.get(PLATOS_API_URL);
        return response.data as Plato[];
    } catch (error) {
        console.log(error)
        return [];
    }
}