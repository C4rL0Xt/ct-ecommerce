import { Component } from '@angular/core';
import { ClCheckboxComponent } from '../../../shared/colmilloui/cl-checkbox/cl-checkbox.component';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClCheckboxGroupComponent } from '../../../shared/colmilloui/cl-checkbox-group/cl-checkbox-group.component';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'app-playground',
	imports: [ClCheckboxComponent, ClCheckboxGroupComponent, ReactiveFormsModule, JsonPipe],
	templateUrl: './playground.component.html',
	styleUrl: './playground.component.scss',
})
export class PlaygroundComponent {
    fb: FormBuilder = new FormBuilder();
	controlCheckbox = new FormControl<boolean>(false);

	categorias = [
		{ id: 1, label: 'Camisas' },
		{ id: 2, label: 'Pantalones' },
		{ id: 3, label: 'Zapatos' },
	];

	form = this.fb.group({
		categorias: this.fb.control<number[]>([]),
	});
}
