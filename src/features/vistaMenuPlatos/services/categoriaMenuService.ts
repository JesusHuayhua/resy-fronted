import axios from "axios";

const CATEGORIA_API_URL="http://localhost:8081/categorias?"

export interface Categoria {
  IDCategoria: number;
  Info: {
    Nombre: string;
  };
}


export async function obtenerCategorias(): Promise<Categoria[]>{
    try {
        const response = await axios.get(CATEGORIA_API_URL);
        return response.data as Categoria[];
    } catch (error) {
        console.log(error);
        return [];
    }
}