import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostComponent } from './post/post.component';
import { CommentCreateComponent } from './comment/comment-create/comment-create.component';
import { CommentComponent } from './comment/comment/comment.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavBarComponent,
    FooterComponent,
    NotFoundComponent,
    PostComponent,
    CommentCreateComponent,
    CommentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    NavBarComponent,
    FooterComponent,
    NotFoundComponent,
    PostComponent,
    CommentCreateComponent,
    CommentComponent,
  ]
})
export class SharedModule { }
