import { CDN_URL } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { Component } from './base/components';
import { IEvents } from './base/events';

export interface IGalleryCard {
	category: string;
	title: string;
	price: number;
	image: string;
}

export class GalleryCard
	extends Component<IGalleryCard>
	implements IGalleryCard
{
	protected elementCategory: HTMLElement;
	protected elementTitle: HTMLElement;
	protected elementPrice: HTMLElement;
	protected elementImage: HTMLImageElement;

	constructor(container: HTMLElement, events: IEvents, id: string) {
		super(container);
		this.elementCategory = ensureElement('.card__category', this.container);
		this.elementTitle = ensureElement('.card__title', this.container);
		this.elementPrice = ensureElement('.card__price', this.container);
		this.elementImage = ensureElement<HTMLImageElement>(
			'.card__image',
			this.container
		);

		this.container.addEventListener('click', () => {
			events.emit('click: on_gallery_card', {card_id: id});
		});
	}

	set category(val: string) {
		this.elementCategory.textContent = val;
	}
	set title(val: string) {
		this.elementTitle.textContent = val;
	}
	set price(val: number) {
		this.elementPrice.textContent = String(val) + ' синапсов';
	}
	set image(val: string) {
		this.elementImage.src = CDN_URL + val;
		this.elementImage.alt = 'картинка товара';
	}
}
