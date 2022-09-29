import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageCommentComponent } from './manage-comment/manage-comment.component';
import { ManageJokeComponent } from './manage-joke/manage-joke.component';
import { ManageProjectComponent } from './manage-project/manage-project.component';



export const MaterialRoutes: Routes = [
    {
        path: 'project',
        component: ManageProjectComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole:['admin','user']
        }
    },{
        path: 'joke',
        component: ManageJokeComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole:['admin','user']
        }
    },
    {
        path: 'comment',
        component: ManageCommentComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole:['admin','user']
        }
    }
];
