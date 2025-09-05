import { Component, input, output } from '@angular/core';
import { IdLabel } from '../../../../../core/domain/interfaces/id-label.interface';

@Component({
  selector: 'boton-talla',
  imports: [],
  templateUrl: './boton-talla.component.html',
  styleUrl: './boton-talla.component.scss'
})
export class BotonTallaComponent {
  valor = input.required<IdLabel<number>>();
  valorSeleccionado = output<number>();

  seleccionar() {
    this.valorSeleccionado.emit(this.valor().id);
  }
}
