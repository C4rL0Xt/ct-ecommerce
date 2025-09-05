import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RUTAS } from '../../../../../core/domain/constants/routes.constant';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { FiltroCatalogoForm } from '../../../../../infraestructura/catalogo/filtro-catalogo-form.form';

@Component({
	selector: 'listado-hombres',
	imports: [RouterLink, FiltrosComponent],
	templateUrl: './listado.component.html',
	styleUrl: './listado.component.scss',
})
export class ListadoHombresComponent {

	fb = new FiltroCatalogoForm();

	readonly Rutas = RUTAS;

	isDrawerFilterOpen = signal<boolean>(false);

	openFiltro() {
		this.isDrawerFilterOpen.set(true);
	}
	cerrarFiltros = () => {
		this.isDrawerFilterOpen.set(false);
	};
}
