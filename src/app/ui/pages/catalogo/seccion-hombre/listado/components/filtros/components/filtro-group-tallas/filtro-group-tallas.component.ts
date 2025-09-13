import { Component, forwardRef, Input, input, OnInit } from '@angular/core';
import { BotonTallaComponent } from '../../../../../../../../shared/components/catalogo/boton-talla/boton-talla.component';
import { IdLabel } from '../../../../../../../../../core/domain/interfaces/id-label.interface';
import {
	ControlValueAccessor,
	FormControl,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
	selector: 'filtro-group-tallas',
	imports: [BotonTallaComponent],
	templateUrl: './filtro-group-tallas.component.html',
	styleUrl: './filtro-group-tallas.component.scss',
})
export class FiltroGroupTallasComponent implements OnInit {
	tallas = input.required<IdLabel<number>[]>();
	@Input() controlTalla!: FormControl<number[] | null | undefined>;
	tallasSeleccionadas: number[] = [];

	ngOnInit(): void {
		this.tallasSeleccionadas = this.controlTalla.value ?? [];
	}

	guardarTallas(id: number) {
		const isPushed = this.tallasSeleccionadas.includes(id);
		if (isPushed) {
			this.tallasSeleccionadas = this.tallasSeleccionadas.filter(
				(t) => t !== id,
			);
		} else {
			this.tallasSeleccionadas.push(id);
		}
		this.controlTalla.setValue(this.tallasSeleccionadas);
	}
}
