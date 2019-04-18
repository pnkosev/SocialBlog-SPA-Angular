import { SharedModule } from './../shared/shared.module';
import { CommentRoutingModule } from './comment-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material/material.module';
import { CommentEditComponent } from './comment-edit/comment-edit.component';

@NgModule({
  declarations: [
    CommentEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommentRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class CommentModule { }
