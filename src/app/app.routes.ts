import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'auth',
		loadComponent: () => import('./ui/pages/auth/auth.component').then((c) => c.AuthComponent)
	},
	{
		path: '',
		loadChildren: () =>
			import('./ui/routes/main.routes').then((r) => r.MAIN_ROUTES),
	},
	{
		path: 'playground',
		loadComponent: () => import('./ui/pages/extras/playground/playground.component').then((c) => c.PlaygroundComponent)
	}
];
