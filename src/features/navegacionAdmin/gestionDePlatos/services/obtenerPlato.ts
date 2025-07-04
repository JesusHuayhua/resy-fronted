import axios from "axios";
import { Plato } from "./clases/ClassPlato"; // Ajusta la ruta si es necesario
import type { IPlatoData } from "./clases/ClassPlato";

const API_URL = "http://localhost:8081/platos";

export async function obtenerPlatos(): Promise<Plato[]> {
  const response = await axios.get(API_URL);
  return response.data.map((p: IPlatoData) => new Plato(p));
}