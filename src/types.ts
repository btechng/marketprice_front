
export type User = {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'reporter' | 'admin';
  points: number;
  language?: string;
};

export type FoodItem = { _id: string; name: string; unit?: string; };
export type Market = { _id: string; name: string; city?: string; state?: string; };
export type PriceReport = {
  _id: string;
  foodItem: FoodItem;
  market: Market;
  reporter?: Pick<User,'_id'|'name'|'email'>;
  price: number;
  unit?: string;
  status: 'pending'|'approved'|'rejected';
  createdAt: string;
  receiptUrl?: string;
};
