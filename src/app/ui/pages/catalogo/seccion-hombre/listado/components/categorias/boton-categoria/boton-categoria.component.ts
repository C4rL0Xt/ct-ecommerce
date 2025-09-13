import { NgClass } from '@angular/common';
import {
	Component,
	computed,
	Input,
	input,
	model,
	OnInit,
	signal,
} from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { Categoria } from '../../../../../../../../core/domain/dto/maestros/categoria.dto';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
	selector: 'boton-categoria',
	imports: [NgClass, RouterLink],
	templateUrl: './boton-categoria.component.html',
	styleUrl: './boton-categoria.component.scss',
})
export class BotonCategoriaComponent implements OnInit {
	categoriaId = input.required<number>();
	categoria = input.required<Categoria>();

	@Input() controlCategoria!: FormControl<number | null | undefined>;
	controlValue = signal<number | null | undefined>(null);

	routeKeyParam = input<string>();

	_categoriaSeleccionado = signal<number>(0);

	estaSeleccionado = computed<boolean>(
		() => this.controlValue() === this.categoriaId(),
	);

	ngOnInit(): void {
		if (!this.controlCategoria) return; 
		this.controlValue.set(this.controlCategoria.value);
		this.controlCategoria.valueChanges.subscribe((v) =>
			this.controlValue.set(v),
		);
	}

	seleccionarCategoria(id: number) {
		this.controlCategoria.setValue(id);
		this._categoriaSeleccionado.set(id);
	}

	queryParam(value: number): Params {
		return { [this.routeKeyParam()!]: value };
	}
}
