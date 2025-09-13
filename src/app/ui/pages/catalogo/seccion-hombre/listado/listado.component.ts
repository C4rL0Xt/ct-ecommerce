import { Component, inject, OnInit, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RUTAS } from '../../../../../core/domain/constants/routes.constant';
import { FiltroCatalogoForm } from '../../../../../infraestructura/catalogo/filtro-catalogo-form.form';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { CatalogoListadoState } from '../../../../../presentation/states/catalogo/listado/catalogo-listado-state.service';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { GeneroEnum } from '../../../../../core/domain/enums/genero.enum';
import { BaseListado } from '../../../../../infraestructura/listado/base-listado.components';
import { ɵFormGroupValue } from '@angular/forms';
import { IFiltroProductoForm } from '../../../../../core/domain/forms/filtro-producto.form';
import { ClIconsDirective } from '../../../../shared/directives/icons.directive';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProductCardComponent } from '../../../../shared/componentes/catalogo/product-card/product-card.component';
import { PRODUCTOS_MOCK } from '../../../../../core/mocks/catalogo/productos/productos.mock';

@Component({
	selector: 'listado-hombres',
	imports: [
		FiltrosComponent,
		CategoriasComponent,
		NzButtonModule,
		ClIconsDirective,
		NzSelectModule,
		ProductCardComponent,
		RouterLink
	],
	templateUrl: './listado.component.html',
	styleUrl: './listado.component.scss',
})
export class ListadoHombresComponent extends BaseListado implements OnInit {
	readonly Rutas = RUTAS;

	generoEnum = GeneroEnum;

	isDrawerFilterOpen = signal<boolean>(false);

	stateCatalogo = inject(CatalogoListadoState);

	productos = PRODUCTOS_MOCK;

	constructor() {
		super({
			formulario: new FiltroCatalogoForm().getFormulario(),
		});
	}

	ngOnInit(): void {}

	override loadFormFromUrl(data: Params): void {
		const genderId = Number(data['genero'] ?? 0);
		const categoriaId = Number(data['categoria'] ?? 0);

		this.formulario?.patchValue({
			generoId: genderId,
			categoriaId: categoriaId,
			categorias: this.toNumberArray(data['subcat']),
			colores: this.toNumberArray(data['col']),
			tallas: this.toNumberArray(data['talla']),
		});
	}

	override handleFormChange(
		form: Partial<{
			generoId: number | null | undefined;
			categoriaId: number | null | undefined;
			categorias: number[] | null | undefined;
			colores: number[] | null | undefined;
			tallas: number[] | null | undefined;
		}>,
	): Params {
		const params: Params = {};

		if (form.generoId) params['genero'] = form.generoId;
		if (form.categoriaId) params['categoria'] = form.categoriaId;
		if (form.categorias?.length) params['subcat'] = form.categorias;
		if (form.colores?.length) params['col'] = form.colores;
		if (form.tallas?.length) params['talla'] = form.tallas;

		return params;
	}

	openFiltro() {
		this.isDrawerFilterOpen.set(true);
	}

	cerrarFiltros = () => {
		this.isDrawerFilterOpen.set(false);
	};

	// refact: util
	private toNumberArray(value: any): number[] {
		if (!value) return [];
		if (Array.isArray(value)) return value.map((v) => Number(v));
		return value
			.toString()
			.split(',')
			.map((v: any) => Number(v));
	}
}
