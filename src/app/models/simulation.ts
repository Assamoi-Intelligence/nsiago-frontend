import { Subscription } from "rxjs";
import { User } from "./user";
import { Product } from "./product";

export interface Simulation {
  id: string;
  quoteReference: string;
  productCode: string;
  userId: string;
  power: string;
  valueNew: string;
  valueVenal: string;
  price: string;
  circulationDate: Date;
  endDate: Date
  createdAt: Date


  subscription: Subscription;
  product: Product;
  user: User;
}
