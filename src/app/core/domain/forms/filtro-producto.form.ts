import { FormControl } from "@angular/forms";

export interface IFiltroProductoForm {
    generoId: FormControl<number | null | undefined>;
    categoriaId: FormControl<number | null | undefined>;
    categorias: FormControl<number[] | null | undefined>;
    precio: FormControl<number[] | null | undefined>;
    tallas: FormControl<number[] | null | undefined>;
    colores: FormControl<number[] | null | undefined>;
}