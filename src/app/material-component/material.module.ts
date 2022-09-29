import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ManageProjectComponent } from './manage-project/manage-project.component';
import { ProjectComponent } from './dialog/project/project.component';
import { ManageCommentComponent } from './manage-comment/manage-comment.component';
import { CommentComponent } from './dialog/comment/comment.component';
import { ManageJokeComponent } from './manage-joke/manage-joke.component';
import { JokeComponent } from './dialog/joke/joke.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
    ManageProjectComponent,
    ProjectComponent,
    ManageCommentComponent,
    CommentComponent,
    ManageJokeComponent,
    JokeComponent    
  ]
})
export class MaterialComponentsModule {}
