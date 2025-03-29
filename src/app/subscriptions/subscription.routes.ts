import { Route } from "@angular/router";
import { SubscriptionListComponent } from "./subscription-list/subscription-list.component";

export const routes: Route[] = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: SubscriptionListComponent }
];
