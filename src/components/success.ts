import { cloneTemplate, ensureElement } from '../utils/utils';
import { Component } from './base/components';
import { IEvents } from './base/events';

export interface ISuccess {
	totalPrice:number;
}

export class Success
	extends Component<ISuccess>
	implements ISuccess
{
	protected content: HTMLElement;
	protected body: HTMLElement;
	protected orderSuccessClose: HTMLButtonElement;
	protected events: IEvents;
	protected successDescription: HTMLElement;

	constructor(container: HTMLElement, content: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this.content = content;

		this.body = cloneTemplate('#success');
	
		this.orderSuccessClose = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this.body
		);
		this.successDescription = ensureElement(
			'.order-success__description',
			this.body
		);

		
		this.orderSuccessClose.addEventListener("click",(evt)=>{
    events.emit('click: order success');
		evt.preventDefault();
		}
		);
	}

	set totalPrice(val: number) {
		this.successDescription.textContent = `Списано ${val} синапсов`; 
	}

	sv(v: boolean) {
		if (v) {
			this.content.replaceChildren(this.body);
			this.events.emit('modal:open');
		} else {
			this.events.emit('modal:close');
		}
		this.toggleClass(this.container, 'modal_active', v);
	}
}
