import { IdLabel } from "../../interfaces/id-label.interface";
import { SubCategoria } from "./subcategoria.dto";

export interface Categoria {
    categoriaId: number;
    generoId: number;
    nombre: string;
    subCategorias: IdLabel<number>[];
    descripcion: string;
}