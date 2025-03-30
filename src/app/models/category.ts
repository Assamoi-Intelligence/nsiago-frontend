import { Subscription } from "./subscription";

export interface Category {
  id: string;
  code: string;
  label: string;
  description: string;
  subcription: Subscription[];
}
