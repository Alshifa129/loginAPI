import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { DashboardComponent } from './pages/dashboard/dashboard';


export const routes: Routes = [

{
path: '',
redirectTo: 'login',
pathMatch: 'full'
},


{
path: 'register',
component:RegisterComponent
},

{
path:'login',
component:LoginComponent
},

{path: 'dashboard',
component: DashboardComponent
}

];
