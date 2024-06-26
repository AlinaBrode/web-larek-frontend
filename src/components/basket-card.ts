import { ensureElement } from "../utils/utils";
import { Component } from "./base/components";
import { IEvents } from "./base/events";

export interface IBasketCard {
  listPosition: number;
	title: string;
	price: number;
}

export class BasketCard
	extends Component<IBasketCard>
	implements IBasketCard {
    protected elementPosition: HTMLElement;
    protected elementTitle: HTMLElement;
    protected elementPrice: HTMLElement;
    protected elementDeleteButton:HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents, id: string) {
      super(container);
      this.elementPosition = ensureElement('.basket__item-index', this.container);
      this.elementTitle = ensureElement('.card__title', this.container);
      this.elementPrice = ensureElement('.card__price', this.container);
      this.elementDeleteButton = ensureElement<HTMLButtonElement> ('.basket__item-delete',this.container);
      this.elementDeleteButton.addEventListener('click',()=>{
        events.emit('click: delete__card',{card_id:id});
      })
    }

  set listPosition(val: number) {
    this.elementPosition.textContent = String(val);
  }

  set title(val: string) {
		this.elementTitle.textContent = val;
	}

	set price(val: number) {
		this.elementPrice.textContent = String(val) + ' синапсов';
	}
}