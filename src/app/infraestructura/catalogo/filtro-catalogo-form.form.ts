import { FormControl, FormGroup } from '@angular/forms';
import { ProductoFiltroRequest } from '../../core/domain/dto/catalogo/filtros/producto-filtro-request.dto';
import { IFiltroProductoForm } from '../../core/domain/forms/filtro-producto.form';
import { FormBase } from '../form-base';

export class FiltroCatalogoForm extends FormBase<
	ProductoFiltroRequest,
	IFiltroProductoForm
> {
	protected override inicializarFormulario(): void {
		this.formulario = new FormGroup<IFiltroProductoForm>({
			categorias: new FormControl<number[] | null | undefined>(undefined),
			precio: new FormControl<number[] | null | undefined>([0, 100]),
			tallas: new FormControl<number[] | null | undefined>(undefined),
			colores: new FormControl<number[] | null | undefined>(undefined),
		});
	}

	protected override toRequest(): ProductoFiltroRequest {
		const f = this.formulario.getRawValue();

		return {
			categorias: f.categorias ?? [],
			precio: f.precio ? { min: f.precio[0], max: f.precio[1] } : undefined,
			tallas: f.tallas ?? [],
			colores: f.colores ?? [],
		};
	}
}
