export interface SellItem {
  id: string;
  category: string;
  description: string;
  title: string;
  price: number;
  image: string;
}

export interface SellItemsFromAPI {
  total: number;
  items: SellItem[];
}

export interface SellItemRepo extends SellItem {
  inBasket: boolean
}

export interface IOrder {
  payment: string;
  address: string;
  email: string;
  phone: string;
  total: number;
  items: string[];
}
