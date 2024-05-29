import { Component } from "./base/components"
import { cloneTemplate, ensureElement } from "../utils/utils";

export interface IBasket {
  basketItems: HTMLElement[];
} 

export class Basket extends Component<IBasket> implements IBasket {
  protected content: HTMLElement;
  protected basketList: HTMLElement;

  constructor(container: HTMLElement, content: HTMLElement) {
    super(container)
    this.content = content;

    let basketBody = cloneTemplate('#basket');
    this.content.replaceChildren(basketBody);
    this.basketList = ensureElement('.basket__list', this.content);

    let closeButton = ensureElement('.modal__close',this.container);
    closeButton.addEventListener('click',()=>{
      this.sv(false);
    })
  }

  set basketItems(items: HTMLElement[]) {
    this.basketList.replaceChildren(... items);
  }

  sv(v: boolean) {
    this.toggleClass(this.container, "modal_active", v);
  }
}
