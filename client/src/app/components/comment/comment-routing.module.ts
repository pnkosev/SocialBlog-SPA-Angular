import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleGuardService } from './../../core/guards/role-guard.service';
import { GetCommentResolver } from './../../core/resolvers/get-comment.resolver';

import { CommentEditComponent } from './comment-edit/comment-edit.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home',
    },
    {
        path: 'edit/:id',
        component: CommentEditComponent,
        resolve: {
            comment: GetCommentResolver,
        },
        canActivate: [RoleGuardService],
        data: {
            expectedRole: 'admin,author'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CommentRoutingModule { }
