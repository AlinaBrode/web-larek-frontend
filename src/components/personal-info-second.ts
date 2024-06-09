import { cloneTemplate } from "../utils/utils";
import { Component } from "./base/components";
import { IEvents } from "./base/events";

export interface IPersonalInfoSecond {
  paymentType:string;
  deliveryAddress:string;
}

export class PersonalInfoSecond
extends Component<IPersonalInfoSecond>
implements IPersonalInfoSecond {
  body:HTMLElement;

  constructor(container:HTMLElement,events:IEvents) {
    super(container);

    this.body = cloneTemplate('#contacts');

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
