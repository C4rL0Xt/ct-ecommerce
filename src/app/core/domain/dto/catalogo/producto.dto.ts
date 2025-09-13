import { FotoProducto } from "./foto-producto.dto";

export interface Producto {
    productoId: number;
    nombreProducto: string;
    colorId: number;
    tallaId: number;
    generoId: number;
    categoriaId: number;
    subcategoriaId: number;
    foto: FotoProducto;
    precio: number;
    moneda: string;
}