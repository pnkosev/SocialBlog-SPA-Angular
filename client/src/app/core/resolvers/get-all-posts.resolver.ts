import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';

@Injectable()
export class GetAllPostsResolver implements Resolve<object> {
    constructor(
        private userService: UserService,
        private postService: PostService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (route.url[0].path === 'profile') {
            return this.userService.getProfile();
        } else if (route.url[0].path === 'home') {
            return this.postService.getAllPosts();
        } else if (route.url[0].path === 'details' || route.url[0].path === 'edit') {
            return this.postService.getPostDetails(route.url[1].path);
        }
    }
}
