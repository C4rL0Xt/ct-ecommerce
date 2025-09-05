import { Routes } from '@angular/router';

export const SECCION_HOMBRE_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('../pages/catalogo/seccion-hombre/listado/listado.component').then(
				(c) => c.ListadoHombresComponent,
			),
	},
	{
		path: ':id',
		loadComponent: () =>
			import('../pages/catalogo/seccion-hombre/detalle/detalle.component').then(
				(c) => c.DetalleComponent,
			),
	},
];
