import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RUTAS } from '../../../../core/domain/constants/routes.constant';
import { GeneroEnum } from '../../../../core/domain/enums/genero.enum';
import { CatalogoListadoState } from '../../../../presentation/states/catalogo/listado/catalogo-listado-state.service';
import { ClIconsDirective } from '../../directives/icons.directive';

@Component({
	selector: 'header-confecciones-tita',
	imports: [RouterLink, NzIconModule, ClIconsDirective,],
	templateUrl: './header-confecciones-tita.component.html',
	styleUrl: './header-confecciones-tita.component.scss',
})
export class HeaderConfeccionesTitaComponent {
	readonly Rutas = RUTAS;

	stateCatalogo = inject(CatalogoListadoState);
	readonly generoEnum = GeneroEnum;


	seleccionarCategoria(id: number) {
		this.stateCatalogo.tipoGenero.set(id);
	}

}
