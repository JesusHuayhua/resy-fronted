export interface IPlatoInfo {
  NombrePlato: string;
  Categoria: number;
  Descripcion: string;
  Precio: number;
  Imagen: string;
  Estado: boolean;
}

export interface IPlatoData {
  IDPlato: number;
  Info: IPlatoInfo;
}

export class Plato {
  private id: number;
  private nombre: string;
  private categoria: number;
  private descripcion: string;
  private precio: number;

  private estado: boolean;

  constructor(data: IPlatoData) {
    this.id = data.IDPlato;
    this.nombre = data.Info.NombrePlato;
    this.categoria = data.Info.Categoria;
    this.descripcion = data.Info.Descripcion;
    this.precio = data.Info.Precio;

    this.estado = data.Info.Estado;
  }

  getId(): number {
    return this.id;
  }

  getNombre(): string {
    return this.nombre;
  }

  getCategoria(): number {
    return this.categoria;
  }

  getDescripcion(): string {
    return this.descripcion;
  }

  getPrecio(): number {
    return this.precio;
  }

  estaActivo(): boolean {
    return this.estado;
  }
}