import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageProjectComponent } from './manage-project/manage-project.component';



export const MaterialRoutes: Routes = [
    {
        path: 'project',
        component: ManageProjectComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole:['admin','user']
        }
    }
];
