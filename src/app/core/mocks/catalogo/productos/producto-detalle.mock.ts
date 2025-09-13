import { ProductoDetalle } from '../../../domain/dto/catalogo/producto-detalle.dto';

export const PRODUCTO_DETALLE_MOCK: ProductoDetalle = {
	nombre: 'Camiseta Clásica Algodón Blanco',
	descripcion:
		'Camiseta de algodón 100% blanco, corte recto, cuello redondo. Ideal para uso diario, suave al tacto, tipo básica unisex.',
	subcategoria: 5,
	precio: 59.99,
	colores: [
		{
			colorId: 1,
			nombreColor: 'Blanco',
			codigoHex: '#FFFFFF',
			stock: 150,
			tallas: [
				{ tallaId: 1, nombre: 'S', stock: 30 },
				{ tallaId: 2, nombre: 'M', stock: 50 },
				{ tallaId: 3, nombre: 'L', stock: 40 },
				{ tallaId: 4, nombre: 'XL', stock: 20 },
				{ tallaId: 5, nombre: 'XXL', stock: 10 },
			],
			fotos: [
				{
					fotoId: 1,
					url: 'https://hmperu.vtexassets.com/unsafe/1280x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5648975%2FVestido-tunica-con-cinturon-para-anudar---Albaricoque-claro-Floral---H-M-PE.jpg%3Fv%3D638852679569070000',
				},
				{
					fotoId: 2,
					url: 'https://hmperu.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5648977%2FVestido-tunica-con-cinturon-para-anudar---Albaricoque-claro-Floral---H-M-PE.jpg%3Fv%3D638852679600170000',
				},
				{
					fotoId: 3,
					url: 'https://hmperu.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5648976%2FVestido-tunica-con-cinturon-para-anudar---Albaricoque-claro-Floral---H-M-PE.jpg%3Fv%3D638852679586570000',
				},
			],
		},
		{
			colorId: 2,
			nombreColor: 'Negro',
			codigoHex: '#000000',
			stock: 100,
			tallas: [
				{ tallaId: 6, nombre: 'S', stock: 20 },
				{ tallaId: 7, nombre: 'M', stock: 30 },
				{ tallaId: 8, nombre: 'L', stock: 25 },
				{ tallaId: 9, nombre: 'XL', stock: 15 },
				{ tallaId: 10, nombre: 'XXL', stock: 10 },
			],
			fotos: [
				{
					fotoId: 4,
					url: 'https://hmperu.vtexassets.com/unsafe/1280x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F6026841%2FVestido-tunica-con-cinturon-para-anudar---Negro---H-M-PE.jpg%3Fv%3D638912112428000000',
				},
				{
					fotoId: 5,
					url: 'https://hmperu.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F6026842%2FVestido-tunica-con-cinturon-para-anudar---Negro---H-M-PE.jpg%3Fv%3D638912112442170000',
				},
                {
					fotoId: 6,
					url: 'https://hmperu.vtexassets.com/unsafe/1280x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F6026843%2FVestido-tunica-con-cinturon-para-anudar---Negro---H-M-PE.jpg%3Fv%3D638912112455700000',
				},
			],
		},
		{
			colorId: 3,
			nombreColor: 'Gris Claro',
			codigoHex: '#D3D3D3',
			stock: 80,
			tallas: [
				{ tallaId: 11, nombre: 'S', stock: 15 },
				{ tallaId: 12, nombre: 'M', stock: 25 },
				{ tallaId: 13, nombre: 'L', stock: 20 },
				{ tallaId: 14, nombre: 'XL', stock: 10 },
				{ tallaId: 15, nombre: 'XXL', stock: 10 },
			],
			fotos: [
				{
					fotoId: 7,
					url: 'https://hmperu.vtexassets.com/unsafe/1280x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5648960%2FVestido-tunica-con-cinturon-para-anudar---Negro-Estampado---H-M-PE.jpg%3Fv%3D638852679456500000',
				},
				{
					fotoId: 8,
					url: 'https://hmperu.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5648963%2FVestido-tunica-con-cinturon-para-anudar---Negro-Estampado---H-M-PE.jpg%3Fv%3D638852679497200000',
				},
				{
					fotoId: 9,
					url: 'https://hmperu.vtexassets.com/unsafe/1280x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5648962%2FVestido-tunica-con-cinturon-para-anudar---Negro-Estampado---H-M-PE.jpg%3Fv%3D638852679482300000',
				},
			],
		},
	],
	detalles: {
		material: 'Algodón orgánico 100%',
		longitudPrenda: 'Cadera',
		ajuste: 'Regular fit',
		materialPrinciapl: 'Algodón peinado',
		origenFabricacion: 'Perú',
	},
};
