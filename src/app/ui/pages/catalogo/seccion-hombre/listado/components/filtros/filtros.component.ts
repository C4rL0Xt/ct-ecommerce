import {
	Component,
	DestroyRef,
	inject,
	Input,
	input,
	model,
	OnInit,
} from '@angular/core';
import { NzCheckboxOption } from 'ng-zorro-antd/checkbox';
import { NzDrawerModule, NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { SUBCATEGORIAS_HOMBRE_MOCK } from '../../../../../../../core/mocks/catalogo/maestros/subcategorias/subcategorias-hombre.mock';
import { ClCheckboxGroupComponent } from '../../../../../../shared/colmilloui/cl-checkbox-group/cl-checkbox-group.component';
import { BotonTallaComponent } from '../../../../../../shared/components/catalogo/boton-talla/boton-talla.component';
import { TALLAS_MOCK } from '../../../../../../../core/mocks/catalogo/maestros/tallas.mock';
import { BotonColorComponent } from '../../../../../../shared/components/catalogo/boton-color/boton-color.component';
import { COLORES_MOCK } from '../../../../../../../core/mocks/catalogo/maestros/color.mock';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IFiltroProductoForm } from '../../../../../../../core/domain/forms/filtro-producto.form';
import { FiltroGroupColoresComponent } from './components/filtro-group-colores/filtro-group-colores.component';
import { FiltroGroupTallasComponent } from './components/filtro-group-tallas/filtro-group-tallas.component';
import { CatalogoListadoState } from '../../../../../../../presentation/states/catalogo/listado/catalogo-listado-state.service';
import { CATEGORIAS_MOCK } from '../../../../../../../core/mocks/catalogo/maestros/categorias.mock';
import { IdLabel } from '../../../../../../../core/domain/interfaces/id-label.interface';
import { CategoriaEnum } from '../../../../../../../core/domain/enums/categoria.enum';
import { GeneroEnum } from '../../../../../../../core/domain/enums/genero.enum';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'filtros-drawer-hombres',
	imports: [
		NzDrawerModule,
		ClCheckboxGroupComponent,

		NzSliderModule,
		ReactiveFormsModule,
		NzButtonModule,
		FiltroGroupColoresComponent,
		FiltroGroupTallasComponent,
	],
	templateUrl: './filtros.component.html',
	styleUrl: './filtros.component.scss',
})
export class FiltrosComponent implements OnInit {
	stateCatalogo = inject(CatalogoListadoState);
	private destroyRef = inject(DestroyRef);

	@Input() formulario!: FormGroup<IFiltroProductoForm>;

	subcategorias: IdLabel<number>[] | undefined;

	dataCategorias = CATEGORIAS_MOCK;
	readonly tallas = TALLAS_MOCK;
	readonly colores = COLORES_MOCK;

	isVisible = model.required<boolean>();
	handleClose = input.required<() => void>();

	placement: NzDrawerPlacement = 'left';

	private _subcategoriasSeleccionadas: number[] = [];
	private _categoriaId: number | undefined;
	private _generoId: number | undefined;
	private isFirstCall = true;

	constructor() {}

	ngOnInit(): void {
		this.getValueFromForm();
		const controlGenero = this.formulario.controls.generoId;
		const controlCategoria = this.formulario.controls.categoriaId;

		combineLatest([controlGenero.valueChanges, controlCategoria.valueChanges])
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(([generoId, categoriaId]) => {
				this._generoId = generoId ?? GeneroEnum.Hombre;
				this._categoriaId = categoriaId ?? CategoriaEnum.Todos;
				console.log('ss');
				this.filtrarSubCategorias(this._generoId, this._categoriaId);
			});
	}

	guardarSubcategorias(id: number) {
		const isPushed = this._subcategoriasSeleccionadas.includes(id);
		if (isPushed) return;
		this._subcategoriasSeleccionadas.push(id);
	}

	mostrarFormulario() {
		console.log(this.formulario.getRawValue());
		this.isVisible.set(false);
	}

	filtrarSubCategorias(generoId: number, categoriaId: number) {
		this.subcategorias = this.dataCategorias.filter(
			(c) => c.generoId === generoId && c.categoriaId === categoriaId,
		)[0].subCategorias;
	}

	getValueFromForm() {
		if (this.isFirstCall) {
			this.isFirstCall = false;
			this._generoId =
				this.formulario.controls.generoId.value ?? GeneroEnum.Hombre;
			this._categoriaId =
				this.formulario.controls.categoriaId.value ?? CategoriaEnum.Todos;
			this.filtrarSubCategorias(this._generoId, this._categoriaId);
		}
	}
}
