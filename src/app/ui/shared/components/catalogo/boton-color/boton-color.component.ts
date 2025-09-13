import { NgClass, NgStyle } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { IdLabel } from '../../../../../core/domain/interfaces/id-label.interface';
import { FormControl } from '@angular/forms';
import { ClIconsDirective } from '../../../directives/icons.directive';

@Component({
	selector: 'boton-color',
	imports: [NgStyle, NgClass],
	templateUrl: './boton-color.component.html',
	styleUrl: './boton-color.component.scss',
})
export class BotonColorComponent {
	color = input.required<IdLabel<number>>();
	colorSeleccionado = output<number>();

	colorId = input.required<number>();
  coloresSeleccionados = input.required<number[]>();

	seleccionar() {
		this.colorSeleccionado.emit(this.color().id);
	}

  get estaSeleccionado() {
    return this.coloresSeleccionados().includes(this.colorId());
  }
}
