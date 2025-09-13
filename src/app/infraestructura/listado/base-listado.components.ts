import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ɵFormGroupValue } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BaseListadoData } from '../../core/domain/interfaces/base-listado-data.interface';
import { IFiltroProductoForm } from '../../core/domain/forms/filtro-producto.form';

export abstract class BaseListado {
	private readonly destroyRef = inject(DestroyRef);
	protected readonly route = inject(ActivatedRoute);
	protected readonly router = inject(Router);

	protected formulario?: FormGroup<IFiltroProductoForm>;

	constructor(data: BaseListadoData) {
		this.formulario = data.formulario;
		this.getQueryParams();
		this.listenFormChange();
	}

	handleFormChange?(form: ɵFormGroupValue<IFiltroProductoForm>): Params;
	loadFormFromUrl?(data: Params): void;


	protected getQueryParams(): void {
		this.route.queryParams
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((data) => {
				this.loadFormFromUrl?.(data);
			});
	}

	protected listenFormChange(): void {
		this.formulario?.valueChanges
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((form) => {
				if (!this.handleFormChange) return;
				this.updateQueryParams(this.handleFormChange(form));
			});
	}

	protected updateQueryParams(params: Params): void {
		if (!Object.keys(params).length) return;

		this.router.navigate([], {
			queryParamsHandling: 'merge',
			queryParams: params
		});
	}
}
