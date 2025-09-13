import { FormGroup } from "@angular/forms";
import { IFiltroProductoForm } from "../forms/filtro-producto.form";

export interface BaseListadoData {
    formulario?: FormGroup<IFiltroProductoForm>;
}