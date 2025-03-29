import { Route } from "@angular/router";
import { SimulationListComponent } from "./simulation-list/simulation-list.component";

export const routes: Route[] = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: SimulationListComponent}
];
