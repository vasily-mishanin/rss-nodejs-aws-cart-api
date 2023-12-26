export enum CartStatuses {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
  STATUS = 'STATUS',
}

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type CartItem = {
  product: Product;
  count: number;
};

export type Cart = {
  id: string;
  user_id: string;
  created_at: Date | string;
  updated_at: Date | string;
  status: CartStatuses | string;
  cart_items: CartItem[];
};
