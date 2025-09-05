import {
	Directive,
	ElementRef,
	Input,
	OnChanges,
	OnInit,
	Renderer2,
	SimpleChanges,
} from '@angular/core';
import { Icons } from '../../../core/domain/types/icons.type';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Directive({
	selector: '[icons]',
})
export class IconsDirective implements OnInit {
	private _nombre!: Icons;

	@Input()
	set nombre(value: Icons) {
		this._nombre = value;
		this.loadIcon(value); // <- se recarga automáticamente
	}

	get nombre(): Icons {
		return this._nombre;
	}

	//private readonly renderer = inject(Renderer2);

	constructor(
		private elementRef: ElementRef<HTMLSpanElement>,
		private http: HttpClient,
		private renderer: Renderer2,
	) {}

	ngOnInit(): void {
		if (this.nombre) {
			this.loadIcon(this.nombre);
			
		}
	}

	private loadIcon(iconName: string) {
		const iconPath = `assets/icons/${iconName}.svg`;
		this.http.get(iconPath, { responseType: 'text' }).subscribe({
			next: (svgContent: string) => {
				this.renderer.setProperty(
					this.elementRef.nativeElement,
					'innerHTML',
					'',
				);

				this.renderer.setProperty(
					this.elementRef.nativeElement,
					'innerHTML',
					svgContent,
				);

				this.elementRef.nativeElement.style.display = 'inline-block';
				this.elementRef.nativeElement.style.lineHeight = '1';
				this.elementRef.nativeElement.style.height = '1em';
			},
			error: (error) => {
				console.warn(`No se pudo cargar el icono: ${iconName}`, error);
			},
		});
	}
}

