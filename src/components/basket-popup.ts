import { Component } from "./base/components"
import { cloneTemplate, ensureElement } from "../utils/utils";

export interface IBasket {
  basketItems: HTMLElement[];
} 

export class Basket extends Component<IBasket> implements IBasket {
  protected content: HTMLElement;
  protected basketList: HTMLElement;
  protected basketBody: HTMLElement;

  constructor(container: HTMLElement, content: HTMLElement) {
    super(container)
    this.content = content;

    this.basketBody = cloneTemplate('#basket');
    this.basketList = ensureElement('.basket__list', this.basketBody);

    let closeButton = ensureElement('.modal__close',this.container);
    closeButton.addEventListener('click',()=>{
      this.sv(false);
    })
  }

  set basketItems(items: HTMLElement[]) {
    this.basketList.replaceChildren(... items);
  }

  sv(v: boolean) {
    if (v) {
      this.content.replaceChildren(this.basketBody);
    }
    this.toggleClass(this.container, "modal_active", v);
  }
}
