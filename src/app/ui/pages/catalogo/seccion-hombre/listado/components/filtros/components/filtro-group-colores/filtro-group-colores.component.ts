import { Component, input, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IdLabel } from '../../../../../../../../../core/domain/interfaces/id-label.interface';
import { BotonColorComponent } from '../../../../../../../../shared/components/catalogo/boton-color/boton-color.component';

@Component({
	selector: 'filtro-group-colores',
	imports: [BotonColorComponent],
	templateUrl: './filtro-group-colores.component.html',
	styleUrl: './filtro-group-colores.component.scss',
})
export class FiltroGroupColoresComponent implements OnInit {
	@Input() controlColores!: FormControl<number[] | null | undefined>;

	colores = input.required<IdLabel<number>[]>();

	coloresSeleccionados: number[] = [];

	ngOnInit(): void {
		this.coloresSeleccionados = this.controlColores.value ?? [];
	}

	guardarColores(id: number) {
		const isPushed = this.coloresSeleccionados.includes(id);

		if (isPushed) {
			this.coloresSeleccionados = this.coloresSeleccionados.filter(
				(c) => c !== id,
			);
		} else {
			this.coloresSeleccionados.push(id);
		}

		this.controlColores.setValue(this.coloresSeleccionados);
	}
}
