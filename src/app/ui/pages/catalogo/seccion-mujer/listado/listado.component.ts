import { Component } from '@angular/core';
import { RUTAS } from '../../../../../core/domain/constants/routes.constant';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'listado-mujer',
  imports: [RouterLink],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.scss'
})
export class ListadoMujerComponent {
  readonly Rutas = RUTAS;
}
