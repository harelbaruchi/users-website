import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageUserComponent } from './manage-user/manage-user.component';



export const MaterialRoutes: Routes = [
   {
        path: 'user',
        component: ManageUserComponent,
        // canActivate: [RouteGuardService],
        // data: {
        //     expectedRole:['admin','user']
        // }
    }
];
