import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export abstract class FormBase<
	IRequest,
	IForm extends {
		[K in keyof IForm]: AbstractControl<unknown>;
	} = object,
> {
	formulario!: FormGroup<IForm>;

	private controlsADeshabilitar: AbstractControl<object, object>[];

	constructor() {
		this.controlsADeshabilitar = [];
		this.inicializarFormulario();
		this.desahabilitarCampos?.();
	}

	protected abstract toRequest(): IRequest;
	protected abstract inicializarFormulario(): void;
	protected desahabilitarCampos?(): void;

	public markAllAsTouched() {
		this.formulario.markAllAsTouched();
	}

	public getValue() {
		this.formulario.getRawValue();
	}

	public validar() {
		return !FormBase.isInvalidForm(this.formulario);
	}

	public deshabilitar() {
		this.controlsADeshabilitar = [
			...FormBase.getInputsToDisable(this.formulario),
		];
		this.controlsADeshabilitar.forEach((e) => e.disable({ emitEvent: false }));
	}

	public habilitar() {
		this.controlsADeshabilitar.forEach((e) => e.enable({ emitEvent: false }));
		this.controlsADeshabilitar = [];
	}

	public resetear() {
		this.formulario.reset();
		Object.values(this.formulario.controls).forEach((control) => {
			if (control instanceof FormArray) {
				control.clear({ emitEvent: false });
			}
		});
		this.desahabilitarCampos?.();
	}

	public getErrorMessage(atributo: string): string {
		return FormBase.getErrorMessage(this.formulario.get(atributo)!);
	}

	static isInvalidControl(control: AbstractControl): boolean {
		if (control.invalid) {
			control.markAsDirty();
			control.updateValueAndValidity({ onlySelf: true });
		}

		return control.invalid;
	}

	static isInvalidForm<
		TControl extends {
			[K in keyof TControl]: AbstractControl<unknown>;
		} = object,
	>(formulario: FormGroup<TControl>): boolean {
		if (formulario.invalid) {
			Object.values(formulario.controls).forEach((control) => {
				if (control instanceof FormArray) {
					control.controls.forEach((fg) => {
						FormBase.isInvalidForm(fg as FormGroup);
					});
					return;
				}

				if (control instanceof FormGroup) {
					FormBase.isInvalidForm(control);
					return;
				}

				if (control.invalid) {
					control.markAsDirty();
					control.updateValueAndValidity({ onlySelf: true });
				}
			});
			return true;
		}

		return false;
	}

	static getInputsToDisable<
		TControl extends {
			[K in keyof TControl]: AbstractControl<unknown>;
		} = object,
	>(formulario: FormGroup<TControl>): AbstractControl<object, object>[] {
		const controls: AbstractControl<object, object>[] = [];

		for (const c of Object.values(formulario.controls)) {
			if (c instanceof FormArray) {
				for (const fg of c.controls) {
					controls.push(...FormBase.getInputsToDisable(fg as FormGroup));
				}
				continue;
			}

			if (c instanceof FormGroup) {
				controls.push(...FormBase.getInputsToDisable(c));
				continue;
			}

			if (c.enabled) {
				controls.push(c);
			}
		}

		return controls;
	}

	static getErrorMessage(FC: AbstractControl) {
		if (!FC.errors) return '';

		if (FC.errors['required']) return 'El campo es requirido';
		if (FC.errors['minlength'])
			return `Debe ingresar mínimo ${FC.errors['minlength']['requiredLength']} caracteres`;
		if (FC.errors['maxlength'])
			return `Debe ingresar máximo ${FC.errors['minlength']['requiredLength']} caracteres`;
		if (FC.errors['email']) return 'El campo debe ser correo electrónico';

		return 'El campo no es válido';
	}
}
