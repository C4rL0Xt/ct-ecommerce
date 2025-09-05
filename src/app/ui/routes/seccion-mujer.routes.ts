import { Routes } from '@angular/router';

export const SECCION_MUJER_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('../pages/catalogo/seccion-mujer/listado/listado.component').then(
				(c) => c.ListadoMujerComponent,
			),
	},
	{
		path: ':id',
		loadComponent: () =>
			import('../pages/catalogo/seccion-mujer/detalle/detalle.component').then(
				(c) => c.DetalleComponent,
			),
	},
];
