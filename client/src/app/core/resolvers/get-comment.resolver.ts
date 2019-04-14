import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CommentService } from '../services/comment.service';

@Injectable()
export class GetCommentResolver implements Resolve<object> {

  constructor(
    private commentService: CommentService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.commentService.getCommentById(route.url[1].path);
  }

}
