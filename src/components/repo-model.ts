import { IRepo } from './repo'
import { SellItem, SellItemRepo } from '../types/sellitem'
import { IEvents } from './base/events';


export class RepoModel implements IRepo {
  protected repoContent: SellItemRepo[] = [];
  protected events;

  constructor(events:IEvents) {
    this.events = events;
  }

  getSellItem(id: string): SellItem {
    return this.repoContent.find((item) => (item.id === id));
  }

  setItems(newContent: SellItem[]): void {
    console.log("new content", newContent);
    this.repoContent = newContent.map(item => ({... item, inBasket: false}));
    console.log("repo content", this.repoContent);
    this.events.emit('items: changed');
  }

  delItem(id: string): void {
    this.repoContent = this.repoContent.filter((item) => item.id !== id);
    this.events.emit('items: changed');
  }

  getCatalogItems(): SellItem[] {
    return this.repoContent; // .filter(item => item.inCatalogue);
  }

  getBasketItems(): SellItem[] {
    return this.repoContent.filter(item => item.inBasket);
  }

  getTotalSum(): number {
    let s = 0;
    for (let item of this.repoContent) {
      if (item.inBasket) {
        s += item.price;  //s = s + item.price
      }
    }
    return s;
  }

  busketItemsNumber(): number {
    let inBasket = 0;
    for (let item of this.repoContent) {
      if (item.inBasket) {
        inBasket ++;
      }
    }
    return inBasket;
  }

  toggleBasketState(id: string): void {
    let item = this.repoContent.filter(item => item.id === id)[0];
    item.inBasket = !item.inBasket;
    this.events.emit('items: changed');
  }

  inBasket(id: string): boolean {
    if (!id) {
      return false;
    }
    return this.repoContent.filter(item => item.id === id)[0].inBasket;
  }

  clearBasket() {
    for(let ind = 0; ind<this.repoContent.length;ind++) {
      this.repoContent[ind].inBasket = false;
    }
    this.events.emit('items: changed');
  }
}
