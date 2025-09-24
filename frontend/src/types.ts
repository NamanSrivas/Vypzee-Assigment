export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  completed: boolean;
  createdAt: string;
}

export interface NewItemForm {
  name: string;
  category: string;
  quantity: number;
}