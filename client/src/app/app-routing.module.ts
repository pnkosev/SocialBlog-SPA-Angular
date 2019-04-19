import { AuthGuardService } from './core/guards/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanLoadPostService } from './core/guards/can-load-post.service';

import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/shared/components/not-found/not-found.component';

import { GetAllPostsResolver } from './core/resolvers/get-all-posts.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      allPosts: GetAllPostsResolver
    }
  },
  {
    path: 'user',
    loadChildren: './components/user/user.module#UserModule',
  },
  {
    path: 'post',
    loadChildren: './components/post/post.module#PostModule',
    canLoad: [CanLoadPostService],
    canActivate: [AuthGuardService]
  },
  {
    path: 'comment',
    loadChildren: './components/comment/comment.module#CommentModule',
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
