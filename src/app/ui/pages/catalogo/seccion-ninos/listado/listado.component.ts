import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RUTAS } from '../../../../../core/domain/constants/routes.constant';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'listado-ninos',
  imports: [RouterLink],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.scss'
})
export class ListadoNinosComponent {
  readonly Rutas = RUTAS;
}
