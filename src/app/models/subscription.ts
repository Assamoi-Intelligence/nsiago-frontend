import { Category } from "./category";
import { Simulation } from "./simulation";
import { User } from "./user";

export interface Subscription {
  id: string;
  simulationId: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED'
  attestationId?: string
  createdAt:Date;
  userId: string;

  firstName: string
  lastName : string
  ciNumber : string
  phone    : string
  address  : string
  city     : string

  immatriculation: string;
  circulationDate: Date;
  color: string;
  seats: number;
  doors: number;
  vehicleCategoryCode: string;
  category: Category;
  user:  User;
  simulation: Simulation;
}
