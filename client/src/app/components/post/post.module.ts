import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';

import { PostListComponent } from './post-list/post-list.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostFormComponent } from './post-form/post-form.component';

@NgModule({
  declarations: [
    PostListComponent,
    PostDetailsComponent,
    PostEditComponent,
    PostCreateComponent,
    PostFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    PostRoutingModule,
    MaterialModule,
  ]
})
export class PostModule { }
