import { Component } from './base/components';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export interface IBasket {
	basketItems: HTMLElement[];
	basketTotal: number;
}

export class Basket extends Component<IBasket> implements IBasket {
	protected content: HTMLElement;
	protected basketList: HTMLElement;
	protected basketBody: HTMLElement;
	protected basketButton: HTMLButtonElement;
	protected basketItemsNumberElement: HTMLElement;
	protected events: IEvents;

	constructor(container: HTMLElement, content: HTMLElement, events: IEvents) {
		super(container);
		this.content = content;

		this.basketBody = cloneTemplate('#basket');
		this.basketList = ensureElement('.basket__list', this.basketBody);
		this.basketButton = ensureElement<HTMLButtonElement>(
			'.basket__button',
			this.basketBody
		);
		this.basketItemsNumberElement = ensureElement(
			'.basket__price',
			this.basketBody
		);
		console.log('price element', this.basketItemsNumberElement);
		let closeButton = ensureElement('.modal__close', this.container);
		closeButton.addEventListener('click', () => {
			this.sv(false);
		});

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

	sv(v: boolean) {
		if (v) {
			this.content.replaceChildren(this.basketBody);
			this.events.emit("modal:open");
		} else {
			this.events.emit("modal:close");
		}
		this.toggleClass(this.container, 'modal_active', v);
	}
}
