export interface NullableInt64 {
  Int64: number;
  Valid: boolean;
}

export interface NullableString {
  String: string;
  Valid: boolean;
}

export interface IDataReserva {
  IDCliente: NullableInt64;
  NombreCliente: NullableString;
  TelefonoCliente: NullableString;
  CorreoCliente: NullableString;
  FechaReservada: string;
  NumPersonas: number;
  EstadoReserva: string;
  Especificaciones: string;
}

export class Reserva {
  IDReserva: string;
  DataReserva: IDataReserva;

  constructor(IDReserva: string, DataReserva: IDataReserva) {
    this.IDReserva = IDReserva;
    this.DataReserva = DataReserva;
  }

  getId(): string {
    return this.IDReserva;
  }

  getNombreCliente(): string {
    return this.DataReserva.NombreCliente.Valid
      ? this.DataReserva.NombreCliente.String
      : "Nombre no disponible";
  }

  getTelefonoCliente(): string {
    return this.DataReserva.TelefonoCliente.Valid
      ? this.DataReserva.TelefonoCliente.String
      : "Teléfono no disponible";
  }

  getCorreoCliente(): string {
    return this.DataReserva.CorreoCliente.Valid
      ? this.DataReserva.CorreoCliente.String
      : "Correo no disponible";
  }

  getFechaReservada(): string {
    return this.DataReserva.FechaReservada;
  }

  getFechaFormateada(): string {
    return new Date(this.DataReserva.FechaReservada).toLocaleString();
  }

  getNumPersonas(): number {
    return this.DataReserva.NumPersonas;
  }

  getEstadoReserva(): string {
    return this.DataReserva.EstadoReserva;
  }

  getEspecificaciones(): string {
    return this.DataReserva.Especificaciones;
  }

  getResumen(): string {
    return `Reserva ${this.IDReserva} para ${this.DataReserva.NumPersonas} personas el ${this.getFechaFormateada()}`;
  }
}