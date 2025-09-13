import { Component, Input } from '@angular/core';
import { Producto } from '../../../../../core/domain/dto/catalogo/producto.dto';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input({ required: true }) producto!: Producto;
}
