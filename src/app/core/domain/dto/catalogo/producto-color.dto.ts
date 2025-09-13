import { FotoProducto } from "./foto-producto.dto";
import { ProductoTalla } from "./producto-talla.dto";

export interface ProductoColor {
    colorId: number;
    nombreColor: string;
    codigoHex: string;
    stock: number;
    tallas: ProductoTalla[];
    fotos: FotoProducto[];
}