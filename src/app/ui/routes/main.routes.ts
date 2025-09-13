import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';

export const MAIN_ROUTES: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{
				path: '',
				loadComponent: () =>
					import('../pages/home/home.component').then((r) => r.HomeComponent),
			},
			{
				path: 'catalogo',
				loadChildren: () =>
					import('./seccion-hombre.routes').then(
						(r) => r.SECCION_HOMBRE_ROUTES,
					),
			},
			{
				path: 'mujer',
				loadChildren: () =>
					import('./seccion-hombre.routes').then(
						(r) => r.SECCION_HOMBRE_ROUTES,
					),
			},
			{
				path: 'ninos',
				loadChildren: () =>
					import('./seccion-hombre.routes').then(
						(r) => r.SECCION_HOMBRE_ROUTES,
					),
			},
		],
	},
];
