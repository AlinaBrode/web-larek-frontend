import { ensureElement } from '../utils/utils';
import { Component } from './base/components';

export interface IBasketButton {
	basketCounter: number;
}

export class BasketButton
	extends Component<IBasketButton>
	implements IBasketButton
{
	protected elementBasketCounter: HTMLElement;
	constructor(container: HTMLElement) {
		super(container);
		this.elementBasketCounter = ensureElement(
			'.header__basket-counter',
			this.container
		);
	}
	set basketCounter(val: number) {
		this.elementBasketCounter.textContent = String(val);
	}
}
