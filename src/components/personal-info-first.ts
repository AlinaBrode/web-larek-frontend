import { PaymentTypeEnum } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { Component } from './base/components';
import { IEvents } from './base/events';

export interface IPersonalInfoFirst {
	paymentType: PaymentTypeEnum;
	deliveryAddress: string;
}

export class PersonalInfoFirst
	extends Component<IPersonalInfoFirst>
	implements IPersonalInfoFirst
{
	body: HTMLElement;
	cardButton: HTMLButtonElement;
	cashButton: HTMLButtonElement;
	addressElement: HTMLElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);

		this.body = cloneTemplate('#order');
		this.cardButton = ensureElement<HTMLButtonElement>(
			'.button[name="card"]',
			this.body
		);
		this.cashButton = ensureElement<HTMLButtonElement>(
			'.button[name="cash"]',
			this.body
		);
		this.addressElement = ensureElement(
			'.form__input[name="address"]',
			this.body
		);

    this.cardButton.addEventListener('click',()=>events.emit('click: card payment'));
    this.cashButton.addEventListener('click',()=>events.emit('click: cash payment'));
	}

	set paymentType(val: PaymentTypeEnum) {
    this.toggleClass(this.cardButton, 'button-alt-active', val === PaymentTypeEnum.ONLINE);
    this.toggleClass(this.cashButton, 'button-alt-active', val === PaymentTypeEnum.ON_DELIVERY);
  }
	set deliveryAddress(val: string) {}

	sv(v: boolean) {
		if (v) {
			this.container.replaceChildren(this.body);
		}
		this.toggleClass(this.container, 'modal_active', v);
	}
}
