import { Component, forwardRef, input, signal } from '@angular/core';
import { ClCheckboxComponent } from '../cl-checkbox/cl-checkbox.component';
import { IdLabel } from '../../../../core/domain/interfaces/id-label.interface';
import {
	ControlValueAccessor,
	FormsModule,
	NG_VALUE_ACCESSOR,
	NgModel,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'cl-checkbox-group',
	imports: [ClCheckboxComponent, FormsModule],
	templateUrl: './cl-checkbox-group.component.html',
	styleUrl: './cl-checkbox-group.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ClCheckboxGroupComponent),
			multi: true,
		},
	],
})
export class ClCheckboxGroupComponent
	implements ControlValueAccessor
{
	valores = input.required<IdLabel<number>[]>();

	private _seleccionados = signal<number[]>([]);

	onChange = (valor: number[]) => {};
	onTouched = () => {};

	isChecked(id: number): boolean {
		return this._seleccionados().includes(id);
	}

	toggle(id: number) {
		const actual = this._seleccionados();
		let nuevo: number[];

		if (actual.includes(id)) {
			nuevo = actual.filter((x) => x !== id);
		} else {
			nuevo = [...actual, id];
		}

		this._seleccionados.set(nuevo);
		this.onChange(nuevo);
		this.onTouched();
	}
	
	writeValue(obj: number[]): void {
		this._seleccionados.set(obj || []);
	}

	registerOnChange(fn: (valor: number[]) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		// Podrías propagarlo a los checkboxes si quieres
	}
}
