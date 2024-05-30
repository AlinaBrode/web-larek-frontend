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
	protected cardPreviewBody: HTMLElement;

	constructor(container: HTMLElement, content: HTMLElement) {
		super(container);
		this.content = content;

		this.cardPreviewBody = cloneTemplate('#card-preview');

    this.elementCategory = ensureElement('.card__category', this.cardPreviewBody);
		this.elementTitle = ensureElement('.card__title', this.cardPreviewBody);
		this.elementDescription = ensureElement(
			'.card__text',
			this.cardPreviewBody
		);
		this.elementPrice = ensureElement('.card__price', this.cardPreviewBody);
		this.elementImage = ensureElement<HTMLImageElement>(
			'.card__image',
			this.cardPreviewBody
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
		if (v) {
			this.content.replaceChildren(this.cardPreviewBody);
		}
		this.toggleClass(this.container, 'modal_active', v);
	}
}
