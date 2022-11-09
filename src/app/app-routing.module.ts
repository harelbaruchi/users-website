import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';




const routes: Routes = [
  { path: '', component: FullComponent },
  {
    path: 'projects',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/projects/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule), // route guard implementation.
          // canActivate:[RouteGuardService],
          // data: {
          //   expectedRole: ['admin','user']
          // }
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        // canActivate:[RouteGuardService],
        // data: {
        //   expectedRole: ['admin','user']
        // }
      }
    ]
  },
  { path: '**', component: FullComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
