import { cloneTemplate, ensureElement } from "../utils/utils";
import { Component } from "./base/components";
import { IEvents } from "./base/events";

export interface IPersonalInfoFirst {
  paymentType:string;
  deliveryAddress:string;
}

export class PersonalInfoFirst
extends Component<IPersonalInfoFirst>
implements IPersonalInfoFirst {
  body:HTMLElement;
  cardButton:HTMLButtonElement;
  cashButton:HTMLButtonElement;
  addressElement:HTMLElement;

  constructor(container:HTMLElement,events:IEvents) {
    super(container);

    this.body = cloneTemplate('#order');
    console.log('order body', this.body);
    this.cardButton = ensureElement<HTMLButtonElement>('.button[name="card"]', this.body);
    console.log('cardButton', this.cardButton);
    this.cashButton = ensureElement<HTMLButtonElement>('.button[name="cash"]',this.body);
    this.addressElement = ensureElement('.form__input[name="address"]',this.body);
  }

  set paymentType (val: string) {

  }
 set deliveryAddress (val: string) {
    
  }

	sv(v: boolean) {
		if (v) {
			this.container.replaceChildren(this.body);
		}
		this.toggleClass(this.container, 'modal_active', v);
	}
}

