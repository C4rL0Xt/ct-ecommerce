import { Component, input, output } from '@angular/core';
import { IdLabel } from '../../../../../core/domain/interfaces/id-label.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'boton-talla',
  imports: [NgClass],
  templateUrl: './boton-talla.component.html',
  styleUrl: './boton-talla.component.scss'
})
export class BotonTallaComponent {
  tallaId = input.required<number>();
  valor = input.required<IdLabel<number>>();
  valorSeleccionado = output<number>();

  tallasSeleccionadas = input.required<number[]>();

  seleccionar() {
    this.valorSeleccionado.emit(this.valor().id);
  }

  get estaSeleccionado() {
    return this.tallasSeleccionadas().includes(this.tallaId());
  }
}
