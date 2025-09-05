export interface ProductoFiltroRequest {
    categorias?: number[];
    precio?: {
        min?: number;
        max?: number;
    };
    tallas?: number[];
    colores?: number[];
}