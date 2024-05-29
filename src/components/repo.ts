import { SellItem } from "../types/sellitem";

export interface IRepo {
  getSellItem(id: string): SellItem;
  setItems(newItems: SellItem[]): void;
  delItem(id: string): void;
  getCatalogItems(): SellItem[];
  getBasketItems(): SellItem[];
  getTotalSum(): number;
  busketItemsNumber(): number;
  toBasket(id: string): void;
  fromBasket(id: string): void;
}
