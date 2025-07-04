export interface IDataUsuario {
  Nombres: string;
  Apellidos: string;
  Correo: string;
  Telefono: string;
  Direccion: string;
  FechaNacimiento: string;
  Contrasenia: string;
  Rol: number;
  EstadoAcceso: boolean;
}

export class Usuario {
  IdUsuario: number;
  DataUsuario: IDataUsuario;

  constructor(IdUsuario: number, DataUsuario: IDataUsuario) {
    this.IdUsuario = IdUsuario;
    this.DataUsuario = DataUsuario;
  }

  getNombreCompleto(): string {
    return `${this.DataUsuario.Nombres} ${this.DataUsuario.Apellidos}`;
  }

  getCorreo(): string {
    return this.DataUsuario.Correo;
  }

  getRol(): string {
    switch (this.DataUsuario.Rol) {
      case 1: return "Admin";
      case 2: return "Cajero";
      case 3: return "Cliente";
      default: return "Desconocido";
    }
  }

  getEstado(): string {
    return this.DataUsuario.EstadoAcceso ? "Activo" : "Inactivo";
  }
}
