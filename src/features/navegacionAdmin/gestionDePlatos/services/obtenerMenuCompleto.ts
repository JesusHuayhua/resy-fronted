import axios from "axios";
import { MenuCompleto } from "./clases/classMenuCompleto";
import type { IMenuCompletoData } from "./clases/classMenuCompleto"; 

const API_URL = "http://localhost:8081/menu/completo";

export async function obtenerMenuCompleto(id_menu: string): Promise<MenuCompleto> {
  const response = await axios.get(`${API_URL}?id_menu=${id_menu}`);
  return new MenuCompleto(response.data as IMenuCompletoData);
}