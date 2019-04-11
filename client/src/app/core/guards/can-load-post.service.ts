import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';

import { UserService } from './../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class CanLoadPostService implements CanLoad {
    constructor(
        private userService: UserService,
        private router: Router,
    ) { }
    canLoad(route: Route, segments: UrlSegment[]) {
        if (this.userService.isLoggedIn()) {
            return true;
        }

        this.router.navigate(['/user/login']);
        return false;
    }
}
