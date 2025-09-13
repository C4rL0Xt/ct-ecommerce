import { ProductoColor } from "./producto-color.dto";

export interface ProductoDetalle {
    nombre: string;
    descripcion: string;
    subcategoria: number;
    precio: number;
    colores: ProductoColor[];
    detalles: {
        material: string;
        longitudPrenda: string;
        ajuste: string;
        materialPrinciapl: string;
        origenFabricacion: string;
    }
}