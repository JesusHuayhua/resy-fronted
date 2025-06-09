// Clase menú
import { PlatosEnMenuDía } from './classPlatoMenuDia';

export const DiaSemana = {
  Lunes: "Lunes",
  Martes: "Martes",
  Miércoles: "Miércoles",
  Jueves: "Jueves",
  Viernes: "Viernes",
  Sábado: "Sábado",
  Domingo: "Domingo"
}

// Un menú puede tener ninguno o muchos platos del menúi
export class Menu {
    private static id : number = 0;
    private dia : string;
    private platosDia : PlatosEnMenuDía[];
    constructor(dia: string, platosDia : PlatosEnMenuDía[]){
        Menu.id++;
        this.dia = dia;
        this.platosDia = platosDia;
    }

    public getDia(): string{
      return this.dia;
    }

    public getPlatosDia() : PlatosEnMenuDía[]{
      return this.platosDia;
    }
  }