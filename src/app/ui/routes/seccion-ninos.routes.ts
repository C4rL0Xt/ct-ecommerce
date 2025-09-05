import { Routes } from "@angular/router";


export const SECCION_NINOS_ROUTES: Routes = [
    	{
		path: '',
		loadComponent: () =>
			import('../pages/catalogo/seccion-ninos/listado/listado.component').then(
				(c) => c.ListadoNinosComponent,
			),
	},
	{
		path: ':id',
		loadComponent: () =>
			import('../pages/catalogo/seccion-ninos/detalle/detalle.component').then(
				(c) => c.DetalleComponent,
			),
	},
]