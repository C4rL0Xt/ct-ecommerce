import { CommonModule } from '@angular/common';
import { Component, computed, Input, OnChanges, OnInit, signal } from '@angular/core';
import { ProductoColor } from '../../../../../core/domain/dto/catalogo/producto-color.dto';
import { ProductoTalla } from '../../../../../core/domain/dto/catalogo/producto-talla.dto';
import { ProductoDetalle } from '../../../../../core/domain/dto/catalogo/producto-detalle.dto';
import { FotoProducto } from '../../../../../core/domain/dto/catalogo/foto-producto.dto';
import { PRODUCTO_DETALLE_MOCK } from '../../../../../core/mocks/catalogo/productos/producto-detalle.mock';

@Component({
	selector: 'detalle',
	imports: [CommonModule],
	templateUrl: './detalle.component.html',
	styles: [
		`
			:host {
				--accent: var(--color-primary-5);
				display: block;
			}
			.gallery-img {
				will-change: transform, opacity;
			}
			.gallery .main-image:hover .gallery-img {
				transform: scale(1.03) rotate(-0.5deg);
			}

			.thumbnail:focus,
			.thumbnail:hover {
				transform: translateY(-6px);
				box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
			}

			/* Selected talla */
			button.selected {
				background: var(--color-primary-5);
				color: var(--color-inverse);
				border-color: transparent;
			}

			/* Favorited state */
			button.favorited {
				background: linear-gradient(
					135deg,
					var(--color-tertiary-3),
					var(--color-tertiary-6)
				);
				color: white;
			}

			/* small helpers */
			.hide-scrollbar::-webkit-scrollbar {
				display: none;
			}
			.hide-scrollbar {
				-ms-overflow-style: none;
				scrollbar-width: none;
			}

			/* subtle entry animation */
			@keyframes floatIn {
				from {
					opacity: 0;
					transform: translateY(12px) scale(0.995);
				}
				to {
					opacity: 1;
					transform: translateY(0) scale(1);
				}
			}
			main {
				animation: floatIn 0.45s cubic-bezier(0.2, 0.9, 0.3, 1);
			}

			/* Responsive tweaks */
			@media (min-width: 1024px) {
				.main-image {
					aspect-ratio: 4/5;
				}
			}
		`,
	],
})
export class DetalleComponent implements OnInit, OnChanges {
	producto = PRODUCTO_DETALLE_MOCK;

	// Local UI state using Signals
	selectedColorId = signal<number | null>(null);
	selectedTallaId = signal<number | null>(null);
	selectedImageIndex = signal<number>(0);
	cantidad = signal<number>(1);
	isFavorite = signal<boolean>(false);

	// Derived signals
	selectedColor = computed(
		() =>
			this.producto?.colores?.find(
				(c) => c.colorId === this.selectedColorId(),
			) ??
			this.producto?.colores?.[0] ??
			null,
	);

	selectedImage = computed(() => {
		const imgs = this.allImages;
		const idx = Math.min(
			Math.max(this.selectedImageIndex(), 0),
			imgs.length - 1,
		);
		return imgs[idx]?.url ?? imgs[0]?.url ?? '';
	});

	// Flattened list of images from all colors (unique order: current color first)
	get allImages(): FotoProducto[] {
		if (!this.producto) return [];
		const byColor = this.producto.colores ?? [];
		const chosen =
			byColor.find((c) => c.colorId === this.selectedColorId()) ?? byColor[0];
		const images: FotoProducto[] = [];
		if (chosen?.fotos) images.push(...chosen.fotos);
		// append other images from other colors (de-dupe by url)
		for (const c of byColor) {
			for (const f of c.fotos ?? []) {
				if (!images.find((i) => i.url === f.url)) images.push(f);
			}
		}
		return images;
	}

	// Lifecycle behaviors: when Producto input changes, initialize defaults
	ngOnChanges() {
		if (!this.producto) return;
		const firstColor = this.producto.colores?.[0];
		this.selectedColorId.set(firstColor?.colorId ?? null);
		const firstTalla = firstColor?.tallas?.[0];
		this.selectedTallaId.set(firstTalla?.tallaId ?? null);
		this.selectedImageIndex.set(0);
		this.cantidad.set(1);
	}

  ngOnInit(): void {
    
  }

	// Actions
	selectColor(id: number) {
		this.selectedColorId.set(id);
		this.selectedImageIndex.set(0);
		// reset talla selection if not available
		const tallas = this.tallasDisponibles();
		if (
			tallas.length &&
			!tallas.find((t) => t.tallaId === this.selectedTallaId())
		) {
			this.selectedTallaId.set(tallas[0].tallaId);
		}
	}

	selectTalla(tallaId: number) {
		this.selectedTallaId.set(tallaId);
	}

	selectImage(i: number) {
		this.selectedImageIndex.set(i);
	}

	increment() {
		const stock = this.stockDisponible();
		if (this.cantidad() < stock) this.cantidad.update((v) => v + 1);
	}
	decrement() {
		if (this.cantidad() > 1) this.cantidad.update((v) => v - 1);
	}

	stockDisponible(): number {
		const color = this.selectedColor();
		const talla = (color?.tallas ?? []).find(
			(t) => t.tallaId === this.selectedTallaId(),
		);
		return talla?.stock ?? color?.stock ?? 0;
	}

	tallasDisponibles(): ProductoTalla[] {
		return (
			this.selectedColor()?.tallas ?? this.producto?.colores?.[0]?.tallas ?? []
		);
	}

	canAddToCart(): boolean {
		return !!(
			this.producto &&
			this.selectedTallaId() != null &&
			this.stockDisponible() >= this.cantidad()
		);
	}

	addToCart() {
		if (!this.canAddToCart()) return;
		// TODO: integrate cart service - here we emit a CustomEvent to let host app handle it
		const payload = {
			producto: this.producto,
			colorId: this.selectedColorId(),
			tallaId: this.selectedTallaId(),
			cantidad: this.cantidad(),
		};
		const ev = new CustomEvent('add-to-cart', {
			detail: payload,
			bubbles: true,
		});
		(event?.target as HTMLElement | null)?.dispatchEvent(ev);
		// little micro-animation feedback
		this.cantidad.set(1);
	}

	toggleFavorite() {
		this.isFavorite.update((v) => !v);
	}

	share() {
		if (navigator.share) {
			navigator.share({
				title: this.producto?.nombre,
				text: this.producto?.descripcion,
			});
		} else {
			// fallback: copy url
			navigator.clipboard?.writeText(location.href);
			alert('Enlace copiado');
		}
	}

	selectImageByUrl(url: string) {
		const idx = this.allImages.findIndex((i) => i.url === url);
		if (idx >= 0) this.selectedImageIndex.set(idx);
	}

	// helpers for ngFor trackBy
	trackByColor = (_: number, c: ProductoColor) => c.colorId;
	trackByTalla = (_: number, t: ProductoTalla) => t.tallaId;

	// image events
	onImageLoad() {}
	onImageError() {}
}
