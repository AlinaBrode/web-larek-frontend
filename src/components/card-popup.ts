import { Component } from './base/components';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { CDN_URL } from '../utils/constants';

export interface ICardPopup {
	category: string;
	title: string;
	description: string;
	price: number;
	image: string;
}

export class CardPopup extends Component<ICardPopup> implements ICardPopup {
	protected content: HTMLElement;

	protected elementCategory: HTMLElement;
	protected elementTitle: HTMLElement;
	protected elementDescription: HTMLElement;
	protected elementPrice: HTMLElement;
	protected elementImage: HTMLImageElement;

	constructor(container: HTMLElement, content: HTMLElement) {
		super(container);
		this.content = content;

		let cardPreviewBody = cloneTemplate('#card-preview');
		this.content.replaceChildren(cardPreviewBody);

    this.elementCategory = ensureElement('.card__category', this.container);
		this.elementTitle = ensureElement('.card__title', this.container);
		this.elementDescription = ensureElement(
			'.card__text',
			this.container
		);
		this.elementPrice = ensureElement('.card__price', this.container);
		this.elementImage = ensureElement<HTMLImageElement>(
			'.card__image',
			this.container
		);


		let closeButton = ensureElement('.modal__close', this.container);
		closeButton.addEventListener('click', () => {
			this.sv(false);
		});
	}

	set category(val: string) {
		this.elementCategory.textContent = val;
	}
	set title(val: string) {
		this.elementTitle.textContent = val;
	}
	set description(val: string) {
		this.elementDescription.textContent = val;
	}
	set price(val: number) {
		this.elementPrice.textContent = String(val) + ' синапсов';
	}

	set image(val: string) {
		this.elementImage.src = CDN_URL + val;
		this.elementImage.alt = 'картинка товара';
	}

	sv(v: boolean) {
		this.toggleClass(this.container, 'modal_active', v);
	}
}
