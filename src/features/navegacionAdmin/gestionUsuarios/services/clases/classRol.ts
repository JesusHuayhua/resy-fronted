export interface IDataRol {
  NombreRol: string;
}

export class Rol {
  ID: number;
  DataRol: IDataRol;

  constructor(ID: number, DataRol: IDataRol) {
    this.ID = ID;
    this.DataRol = DataRol;
  }

  getId(): number {
    return this.ID;
  }

  getNombre(): string {
    return this.DataRol.NombreRol;
  }
}
