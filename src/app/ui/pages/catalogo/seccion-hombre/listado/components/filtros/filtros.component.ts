import { Component, Input, input } from '@angular/core';
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

@Component({
	selector: 'filtros-drawer-hombres',
	imports: [
		NzDrawerModule,
		ClCheckboxGroupComponent,
		BotonTallaComponent,
		BotonColorComponent,
		NzSliderModule,
		ReactiveFormsModule,
		NzButtonModule,
	],
	templateUrl: './filtros.component.html',
	styleUrl: './filtros.component.scss',
})
export class FiltrosComponent {
	// readonly categorias = CATEGORIAS_MOCK;
	@Input() formulario!: FormGroup<IFiltroProductoForm>;

	readonly subcategorias = SUBCATEGORIAS_HOMBRE_MOCK;
	readonly tallas = TALLAS_MOCK;
	readonly colores = COLORES_MOCK;

	isVisible = input.required<boolean>();
	handleClose = input.required<() => void>();

	controlSlider = new FormControl<number[]>([0, 100]);

	placement: NzDrawerPlacement = 'left';

	private _coloresSeleccionados: number[] = [];
	private _tallasSeleccionadas: number[] = [];
	private _subcategoriasSeleccionadas: number[] = [];

	guardarColores(id: number) {
		const isPushed = this._coloresSeleccionados.includes(id);
		if (isPushed) {
			return;
		}
		this._coloresSeleccionados.push(id);
	}

	guardarTallas(id: number) {
		const isPushed = this._tallasSeleccionadas.includes(id);
		if (isPushed) {
			return;
		}
		this._tallasSeleccionadas.push(id);
	}

	guardarSubcategorias(id: number) {
		const isPushed = this._subcategoriasSeleccionadas.includes(id);
		if (isPushed) return;
		this._subcategoriasSeleccionadas.push(id);
	}

	mostrarFormulario() {
		this.formulario.controls.colores.setValue(this._coloresSeleccionados);
		this.formulario.controls.tallas.setValue(this._tallasSeleccionadas);
		console.log(this.formulario.getRawValue());
	}
}
