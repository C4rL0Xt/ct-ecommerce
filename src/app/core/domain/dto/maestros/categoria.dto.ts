import { SubCategoria } from "./subcategoria.dto";

export interface Categoria {
    categoriaId: number;
    generoId: number;
    nombre: string;
    subCategorias: SubCategoria[];
    descripcion: string;
}