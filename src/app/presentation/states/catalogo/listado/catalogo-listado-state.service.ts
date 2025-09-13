import { computed, effect, Injectable, signal } from "@angular/core";
import { CategoriaEnum } from "../../../../core/domain/enums/categoria.enum";



@Injectable({
    providedIn: 'root'
})
export class CatalogoListadoState {
    tipoGenero = signal<number | undefined>(undefined);
    tipoCategoria = signal<number | undefined>(CategoriaEnum.Todos);

    _ultimoGeneroId: number | undefined;
    _ultimoCategoriaId: number | undefined;

    constructor() {
        // effect(() => {
        //     console.log(`La categoria que selecciono es: ${this.tipoCategoria()}`);
        //     console.log(`El genero seleccionado es ${this.tipoGenero()}`);
        // });
    }
}