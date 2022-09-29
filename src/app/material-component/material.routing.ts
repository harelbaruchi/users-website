import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageJokeComponent } from './manage-joke/manage-joke.component';



export const MaterialRoutes: Routes = [
   {
        path: 'joke',
        component: ManageJokeComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole:['admin','user']
        }
    }
];
