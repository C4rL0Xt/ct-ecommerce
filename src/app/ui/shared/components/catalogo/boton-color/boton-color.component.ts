import { NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { IdLabel } from '../../../../../core/domain/interfaces/id-label.interface';

@Component({
  selector: 'boton-color',
  imports: [NgStyle,],
  templateUrl: './boton-color.component.html',
  styleUrl: './boton-color.component.scss'
})
export class BotonColorComponent {
  color = input.required<IdLabel<number>>();
  colorSeleccionado = output<number>();

  seleccionar() {
    this.colorSeleccionado.emit(this.color().id);
  }
}
