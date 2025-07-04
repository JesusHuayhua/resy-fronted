export interface IMenuData {
  fecha_inicio: string; // Ej: "2025-06-24T00:00:00Z"
  fechafin: string;     // Ej: "2025-06-30T00:00:00Z"
  id_menu: string;      // Ej: "Men1"
}

export class Menu {
  private fecha_inicio: string;
  private fechafin: string;
  private id_menu: string;

  constructor(data: IMenuData) {
    this.fecha_inicio = data.fecha_inicio;
    this.fechafin = data.fechafin;
    this.id_menu = data.id_menu;
  }

  getFechaInicio(): string {
    return this.fecha_inicio;
  }

  getFechaFin(): string {
    return this.fechafin;
  }

  getIdMenu(): string {
    return this.id_menu;
  }
}
