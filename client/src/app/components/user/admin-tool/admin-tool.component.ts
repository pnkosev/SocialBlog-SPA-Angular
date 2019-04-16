import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { PostService } from './../../../core/services/post.service';
import { CommentService } from './../../../core/services/comment.service';
import { Post } from '../../shared/models/post';
import { Comment } from './../../shared/models/comment';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-admin-tool',
  templateUrl: './admin-tool.component.html',
  styleUrls: ['./admin-tool.component.css']
})
export class AdminToolComponent implements OnInit, OnDestroy {
  pendingPosts$: Observable<Post[]>;
  pendingComments$: Observable<Comment[]>;
  private isAlive$ = new Subject();

  constructor(
    private postService: PostService,
    private commentService: CommentService,
  ) { }

  ngOnInit() {
    this.getPendingPosts();
    this.getPendingComments();
  }

  getPendingPosts() {
    this.pendingPosts$ = this.postService.getPendingPosts();
  }

  deletePost(id: string) {
    this.postService.deletePost(id)
      .pipe(takeUntil(this.isAlive$))
      .subscribe(_ => this.getPendingPosts());
  }

  approvePost(id: string) {
    this.postService.approvePost(id)
      .pipe(takeUntil(this.isAlive$))
      .subscribe(_ => this.getPendingPosts());
  }

  getPendingComments() {
    this.pendingComments$ = this.commentService.getPendingComments();
  }

  deleteComment(id: string) {
    this.commentService.deleteComment(id)
      .pipe(takeUntil(this.isAlive$))
      .subscribe(_ => this.getPendingComments());
  }

  approveComment(id: string) {
    this.commentService.approveComment(id)
      .pipe(takeUntil(this.isAlive$))
      .subscribe(_ => this.getPendingComments());
  }

  ngOnDestroy() {
    this.isAlive$.next();
    this.isAlive$.complete();
  }

}
