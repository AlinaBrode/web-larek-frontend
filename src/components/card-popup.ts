import { Component } from './base/components';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { CDN_URL } from '../utils/constants';
import { IEvents } from './base/events';

export interface ICardPopup {
	category: string;
	title: string;
	description: string;
	price: number;
	image: string;
	id:string;
	inBasket: boolean;
}

export class CardPopup extends Component<ICardPopup> implements ICardPopup {
	protected content: HTMLElement;

	protected elementCategory: HTMLElement;
	protected elementTitle: HTMLElement;
	protected elementDescription: HTMLElement;
	protected elementPrice: HTMLElement;
	protected elementImage: HTMLImageElement;
	protected cardPreviewBody: HTMLElement;
	protected basketPutGetButton: HTMLButtonElement;
	protected itemId:string;

	constructor(container: HTMLElement, content: HTMLElement, events: IEvents) {
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
		this.basketPutGetButton = ensureElement<HTMLButtonElement>(
			'.card__button',
			this.cardPreviewBody
		);
		this.basketPutGetButton.addEventListener('click',
		()=>events.emit('put-get-item',{itemId: this.itemId}));
		


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

	set id(val:string){
		this.itemId = val;
	}

	get id(){
		return this.itemId;
	}

	set inBasket(val: boolean) {
		this.basketPutGetButton.textContent = val ? "Из корзины" : "В корзину";
	}

	sv(v: boolean) {
		if (v) {
			this.content.replaceChildren(this.cardPreviewBody);
		}
		this.toggleClass(this.container, 'modal_active', v);
	}
}
