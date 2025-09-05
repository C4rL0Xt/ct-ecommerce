import { FormControl } from "@angular/forms";

export interface IFiltroProductoForm {
    categorias: FormControl<number[] | null | undefined>;
    precio: FormControl<number[] | null | undefined>;
    tallas: FormControl<number[] | null | undefined>;
    colores: FormControl<number[] | null | undefined>;
}