import { cloneTemplate, ensureElement } from "../utils/utils";
import { Component } from "./base/components";
import { IEvents } from "./base/events";

export interface IPersonalInfoSecond {
  email: string;
  phone: string;
  enableButton:boolean;
}

export class PersonalInfoSecond
extends Component<IPersonalInfoSecond>
implements IPersonalInfoSecond {
 protected body:HTMLElement;
  protected events:IEvents;
  protected content: HTMLElement;
  protected emailElement: HTMLInputElement;
  protected phoneElement: HTMLInputElement;
  protected orderButton : HTMLButtonElement;

  constructor(container:HTMLElement,content: HTMLElement, events:IEvents) {
    super(container);
    this.content = content;
    this.events = events;

    this.body = cloneTemplate('#contacts');
    this.emailElement = ensureElement<HTMLInputElement>(
			'.form__input[name="email"]',
			this.body
		);
    this.phoneElement = ensureElement<HTMLInputElement>(
			'.form__input[name="phone"]',
			this.body
		);
    this.orderButton = ensureElement<HTMLButtonElement>(
			'.button',
			this.body
		);
    this.emailElement.addEventListener('input', (evt) => {
			const target = evt.target as HTMLInputElement;
			events.emit('email_input:change', {
				text: target.value,
			});
		});
    this.phoneElement.addEventListener('input', (evt) => {
			const target = evt.target as HTMLInputElement;
			events.emit('phone_input:change', {
				text: target.value,
			});
		});
    this.orderButton.addEventListener('click',(evt)=>{
      evt.preventDefault();
      this.events.emit('click: personalInfoSecondNext');
    });
  }

  set email (val: string) {
    this.emailElement.value = val;
  }

  set phone (val: string) {
    this.phoneElement.value = val;
  }

  set enableButton(val:boolean) {
		this.setDisabled(this.orderButton, !val);
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
