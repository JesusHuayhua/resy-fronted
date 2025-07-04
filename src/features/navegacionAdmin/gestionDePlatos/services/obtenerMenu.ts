import axios from "axios";
import { Menu } from "./clases/classMenu";
import type { IMenuData } from "./clases/classMenu";

const API_URL = "http://localhost:8081/menu";

export async function obtenerMenu(): Promise<Menu[]> {
  const response = await axios.get(API_URL);
  // Mapea la respuesta a instancias de Menu
  return response.data.map(
    (m: IMenuData) => new Menu(m)
  );
}
