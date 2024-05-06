import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TeamComponent } from './team/team.component';
import { AuthGuard } from './auth-guard.service';
const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'navbar',
    component:NavbarComponent
  },
  {
    path:'register',
    component:RegistrationComponent
  },
  { path: 'feedback-form', component: FeedbackFormComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'team' , component:TeamComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
    // Redirect to dashboard after login
    { path: 'login', redirectTo: '/dashboard', pathMatch: 'full' },
    // Redirect to login if route not found
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
