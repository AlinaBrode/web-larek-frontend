import { cloneTemplate, ensureElement } from '../utils/utils';
import { BasePopup } from './base/base-popup';
import { IEvents } from './base/events';


export interface IBasket {
	basketItems: HTMLElement[];
	basketTotal: number;
}

export class Basket extends BasePopup<IBasket> implements IBasket {	
	protected basketList: HTMLElement;
	protected basketButton: HTMLButtonElement;
	protected basketItemsNumberElement: HTMLElement;	

	constructor(container: HTMLElement, content: HTMLElement, events: IEvents) {
		const body = cloneTemplate('#basket');

		super(container, content, events, body);


		this.basketList = ensureElement('.basket__list', this.body);
		this.basketButton = ensureElement<HTMLButtonElement>(
			'.basket__button',
			this.body
		);
		this.basketItemsNumberElement = ensureElement(
			'.basket__price',
			this.body
		);

		this.basketButton.addEventListener('click', () =>
			events.emit('click: basket_button')
		);
		this.events = events;
	}

	set basketItems(items: HTMLElement[]) {
		this.basketList.replaceChildren(...items);
	}

	set basketTotal(val: number) {
		this.basketItemsNumberElement.textContent = String(val) + " синапсов";
	}
}
