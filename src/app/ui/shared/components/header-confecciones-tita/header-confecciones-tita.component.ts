import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RUTAS } from '../../../../core/domain/constants/routes.constant';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconsDirective } from '../../directives/icons.directive';
import { NgClass } from "../../../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";

@Component({
	selector: 'header-confecciones-tita',
	imports: [RouterLink, NzIconModule, IconsDirective,],
	templateUrl: './header-confecciones-tita.component.html',
	styleUrl: './header-confecciones-tita.component.scss',
})
export class HeaderConfeccionesTitaComponent {
	readonly Rutas = RUTAS;
}
