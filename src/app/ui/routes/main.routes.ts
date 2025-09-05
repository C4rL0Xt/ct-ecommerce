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
				path: 'hombre',
				loadChildren: () =>
					import('./seccion-hombre.routes').then(
						(r) => r.SECCION_HOMBRE_ROUTES,
					),
			},
			{
				path: 'mujer',
				loadChildren: () =>
					import('./seccion-mujer.routes').then((r) => r.SECCION_MUJER_ROUTES),
			},
			{
				path: 'ninos',
				loadChildren: () =>
					import('./seccion-ninos.routes').then((r) => r.SECCION_NINOS_ROUTES),
			},
		],
	},
];
