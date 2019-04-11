import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { GetAllPostsResolver } from './../../core/resolvers/get-all-posts.resolver';
import { PostListComponent } from './post-list/post-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'create',
    component: PostCreateComponent
  },
  {
    path: 'details/:id',
    component: PostDetailsComponent,
    resolve: {
      post: GetAllPostsResolver
    }
  },
  {
    path: 'edit/:id',
    component: PostEditComponent,
    resolve: {
      post: GetAllPostsResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
