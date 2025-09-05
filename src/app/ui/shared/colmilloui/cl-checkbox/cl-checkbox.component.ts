import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { IconsDirective } from '../../directives/icons.directive';
import { NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'cl-checkbox',
	imports: [IconsDirective, NgClass],
	templateUrl: './cl-checkbox.component.html',
	styleUrl: './cl-checkbox.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ClCheckboxComponent),
			multi: true,
		},
	],
})
export class ClCheckboxComponent implements ControlValueAccessor {

  label = input.required<string | number>();

	private _valor = signal<boolean>(false);
  private _disabled = signal(false);


	estaSeleccionado = computed<boolean>(() => {
		return this._valor();
	});

	onChange = (valor: boolean) => {};
	onTouched = () => {};

	seleccionar() {
		this._valor.update((valor) => !valor);
    this.onChange(this._valor());
	}

	writeValue(obj: boolean): void {
		this._valor.set(obj);
	}
	registerOnChange(fn: (valor: boolean) => {}): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: () => {}): void {
		this.onTouched = fn;
	}
	setDisabledState?(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }
}
