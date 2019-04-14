import { PostService } from './../services/post.service';
import { CommentService } from './../services/comment.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(
    private userService: UserService,
    private commentService: CommentService,
    private postService: PostService,
    private router: Router,
    private toastr: ToastrService,
  ) { }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const root = route.pathFromRoot[1].routeConfig.path;
    const id = route.params.id;
    const expectedRole = route.data.expectedRole.split(',');
    const userId = this.userService.userId;
    const isAdmin = this.userService.isAdmin();
    let isAuthor: boolean;

    if (root === 'comment') {
      return this.commentService.getCommentById(id).pipe(
        map(data => {
          // tslint:disable-next-line: no-string-literal
          const comment = data['comment'];
          isAuthor = comment.creator._id === userId;
          if (expectedRole.includes('admin' && 'author')) {
            if (!isAuthor && !isAdmin) {
              this.toastr.error(
                'You must be an admin or the author in order to have access! Please log in with the necessary credentials!'
              );
              this.router.navigate(['/user/login']);
              return false;
            } else {
              return true;
            }
          } else if (expectedRole.includes('admin')) {
            if (!isAdmin) {
              this.toastr.error('You must be an admin in order to have access! Please log in with the necessary credentials!');
              this.router.navigate(['/user/login']);
              return false;
            } else {
              return true;
            }
          }
        })
      );
    } else if (root === 'post') {
      return this.postService.getPostDetails(id).pipe(
        map(data => {
          // tslint:disable-next-line: no-string-literal
          const post = data['post'];
          isAuthor = post.creator._id === userId;
          if (expectedRole.includes('admin' && 'author')) {
            if (!isAuthor && !isAdmin) {
              this.toastr.error(
                'You must be an admin or the author in order to have access! Please log in with the necessary credentials!'
              );
              this.router.navigate(['/user/login']);
              return false;
            } else {
              return true;
            }
          } else if (expectedRole.includes('admin')) {
            if (!isAdmin) {
              this.toastr.error('You must be an admin in order to have access! Please log in with the necessary credentials!');
              this.router.navigate(['/user/login']);
              return false;
            } else {
              return true;
            }
          }
        })
      );
    } else {
      if (expectedRole.includes('admin')) {
        if (!isAdmin) {
          this.toastr.error('You must be an admin to be able to edit! Please log in with the necessary credentials!');
          this.router.navigate(['/user/login']);
          return false;
        } else {
          return true;
        }
      }
    }
  }
}
