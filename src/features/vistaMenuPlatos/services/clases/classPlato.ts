export class Plato {
    private static id_static: number = 0;
    private id : number;
    private nombre: string;
    private descripcion: string;
    private precio: number;
    private estado: boolean;
    private categoriaId: number; 
    private foto: string;

    constructor(nombre: string, descripcion: string, precio: number,
        estado: boolean, categoriaId: number, foto: string) {
        this.id = Plato.id_static;
        Plato.id_static++;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.estado = estado;
        this.categoriaId = categoriaId;
        this.foto = foto;
    }

    // Getter para ID estático
    public static getIdStatic(): number {
        return Plato.id_static;
    }

    // Getters y setters para cada propiedad
    public getId() : number {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    public getPrecio(): number {
        return this.precio;
    }

    public setPrecio(precio: number): void {
        this.precio = precio;
    }

    public getEstado(): boolean {
        return this.estado;
    }

    public setEstado(estado: boolean): void {
        this.estado = estado;
    }

    public getCategoriaId(): number {
        return this.categoriaId;
    }

    public setCategoriaId(categoriaId: number): void {
        this.categoriaId = categoriaId;
    }

    public getFoto(): string {
        return this.foto;
    }

    public setFoto(foto: string): void {
        this.foto = foto;
    }
}
