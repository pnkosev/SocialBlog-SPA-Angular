import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PostService } from './../../../core/services/post.service';
import { UserService } from './../../../core/services/user.service';
import { CommentService } from './../../../core/services/comment.service';

import { Post } from 'src/app/components/shared/models/post';
import { Comment } from '../../shared/models/comment';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, DoCheck, OnDestroy {
  post: Post;
  isAuthor: boolean;
  isAdmin: boolean;
  commentNum: string;
  private isAlive$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.post = this.route.snapshot.data.post.post;
    this.isAuthor = this.post.creator._id === this.userService.userId;
    this.isAdmin = this.userService.isAdmin();
  }

  ngDoCheck() {
    this.commentNum = this.post.comments.length > 1 ? 'comments' : 'comment';
  }

  deletePost(id: string) {
    this.postService.deletePost(id)
      .pipe(takeUntil(this.isAlive$))
      .subscribe(_ => this.router.navigate(['home']));
  }

  like() {
    this.postService.likePost(this.post._id)
      .pipe(takeUntil(this.isAlive$))
      .subscribe(data => {
        // tslint:disable-next-line: no-string-literal
        this.post.likes = data['post'].likes;
        // tslint:disable-next-line: no-string-literal
        this.post.hates = data['post'].hates;
      });
  }

  hate() {
    this.postService.hatePost(this.post._id)
      .pipe(takeUntil(this.isAlive$))
      .subscribe(data => {
        // tslint:disable-next-line: no-string-literal
        this.post.likes = data['post'].likes;
        // tslint:disable-next-line: no-string-literal
        this.post.hates = data['post'].hates;
      });
  }

  postComment(comment: Comment) {
    this.commentService.postCreateComment(this.post._id, comment)
      .pipe(takeUntil(this.isAlive$))
      .subscribe(data => {
        // tslint:disable-next-line: no-string-literal
        if (data['comment'].status === 'Approved') {
          // tslint:disable-next-line: no-string-literal
          const comments = this.post.comments.concat(data['comment']);
          this.post.comments = comments;
        }
      });
  }

  deleteComment(id: string) {
    this.commentService.deleteComment(id)
      .pipe(takeUntil(this.isAlive$))
      .subscribe(_ => {
        let comments = this.post.comments.slice();
        comments = comments.filter(c => c._id !== id);
        this.post.comments = comments;
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: { name: 'post' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.deletePost(this.post._id);
      }
    });
  }

  ngOnDestroy() {
    this.isAlive$.next();
    this.isAlive$.complete();
  }

}
