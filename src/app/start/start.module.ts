import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/material-module';
import { StartRoutes } from './start.routing';
import { StartComponent } from './start.component';


@NgModule({
    imports:[
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        RouterModule.forChild(StartRoutes)
    ],
    declarations:[]
})

export class StartModule {}