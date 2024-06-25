import { Api } from "./base/api";
import { IOrder, SellItem, SellItemsFromAPI } from "../types/sellitem"

export interface ISellItemAPI {
  getSellItems(): Promise<SellItemsFromAPI>;
  getOneSellItem(sellItemID: string): Promise<SellItem>;
  putOrder(order:IOrder):Promise<boolean>;
}

export class SellItemAPI extends Api implements ISellItemAPI {
  constructor(baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
  }

  getSellItems(): Promise<SellItemsFromAPI> {
    return this.get<SellItemsFromAPI>('/product');
  }

  getOneSellItem(sellItemID: string): Promise<SellItem> {
    return this.get<SellItem>(`/product/${sellItemID}`);
  }

  putOrder(order: IOrder): Promise<boolean> {
    return this.post<boolean>(`/order/`, order);
  }
}
