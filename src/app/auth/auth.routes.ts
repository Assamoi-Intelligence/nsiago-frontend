import { Route } from "@angular/router";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";

export const routes: Route[] = [
  { redirectTo: 'signin', path: '', pathMatch: 'full' },
  { component: SigninComponent, path: 'signin' },
  { component: SignupComponent, path: 'signup' }
]
