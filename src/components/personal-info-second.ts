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
 protected body:HTMLElement;
  protected events:IEvents;
  protected content: HTMLElement;

  constructor(container:HTMLElement,content: HTMLElement, events:IEvents) {
    super(container);
    this.content = content;
    this.events = events;

    this.body = cloneTemplate('#contacts');

  }

  set paymentType (val: string) {

  }
 set deliveryAddress (val: string) {
    
  }

	sv(v: boolean) {
		if (v) {
			this.content.replaceChildren(this.body);
      this.events.emit("modal:open");
		} else {
			this.events.emit("modal:close");
		}
		this.toggleClass(this.container, 'modal_active', v);
	}
}
