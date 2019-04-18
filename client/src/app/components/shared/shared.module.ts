import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PostComponent } from './components/post/post.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { MaterialModule } from 'src/app/material/material.module';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { ShortenStringPipe } from './pipes/shorten-string.pipe';
import { CommentFormComponent } from './components/comment/comment-form/comment-form.component';
import { CommentComponent } from './components/comment/comment/comment.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavBarComponent,
    FooterComponent,
    NotFoundComponent,
    PostComponent,
    CommentFormComponent,
    CommentComponent,
    ScrollToTopComponent,
    DialogBoxComponent,
    ShortenStringPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    HeaderComponent,
    NavBarComponent,
    FooterComponent,
    NotFoundComponent,
    PostComponent,
    CommentFormComponent,
    CommentComponent,
    ScrollToTopComponent,
    ShortenStringPipe,
  ],
  entryComponents: [DialogBoxComponent],
})
export class SharedModule { }
