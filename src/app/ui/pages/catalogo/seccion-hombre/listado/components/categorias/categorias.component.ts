import {
	Component,
	computed,
	DestroyRef,
	inject,
	Input,
	input,
	OnInit,
	signal,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CATEGORIAS_MOCK } from '../../../../../../../core/mocks/catalogo/maestros/categorias.mock';
import { CatalogoListadoState } from '../../../../../../../presentation/states/catalogo/listado/catalogo-listado-state.service';
import { NgClass } from '@angular/common';
import { Categoria } from '../../../../../../../core/domain/dto/maestros/categoria.dto';
import { CategoriaEnum } from '../../../../../../../core/domain/enums/categoria.enum';
import { BotonCategoriaComponent } from './boton-categoria/boton-categoria.component';
import { FormGroup } from '@angular/forms';
import { IFiltroProductoForm } from '../../../../../../../core/domain/forms/filtro-producto.form';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'categorias',
	imports: [NzButtonModule, BotonCategoriaComponent],
	templateUrl: './categorias.component.html',
	styleUrl: './categorias.component.scss',
})
export class CategoriasComponent implements OnInit {
	readonly categorias = CATEGORIAS_MOCK;

	formulario = input.required<FormGroup<IFiltroProductoForm>>();

	controlCategoria = signal<number>(0);

	categoriasFiltradas: Categoria[] = [];

	private destroyRef = inject(DestroyRef);

	constructor() {}

	ngOnInit(): void {
		const generoControl = this.formulario().controls.generoId;

		this.categoriasFiltradas = this.categorias.filter(
			(c) => c.generoId === generoControl.value,
		);

		generoControl.valueChanges
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((valor) => {
				this.categoriasFiltradas = this.categorias.filter(
					(c) => c.generoId === valor,
				);
			});
	}
}
