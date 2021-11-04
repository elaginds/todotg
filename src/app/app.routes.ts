/*
import {Routes, CanActivate, RouterModule} from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ViewComponent } from './view/view.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import {NgModule} from '@angular/core';

const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'todos',
    component: ViewComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
*/
