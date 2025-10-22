
import { Routes } from '@angular/router';
import { LoginComponent } from './ui/pages/login/login.component';
import { RegisterVehicleComponent } from './ui/pages/workshop/register-vehicle/register-vehicle.component';
import { DashboardComponent } from './ui/pages/workshop/dashboard/dashboard.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'workshop/dashboard', component: DashboardComponent },
	{ path: 'workshop/register-vehicle', component: RegisterVehicleComponent },

];
