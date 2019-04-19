import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/core/services/user.service';
import { CommentService } from './../../../core/services/comment.service';
import { Comment } from '../../shared/models/comment.model';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit, OnDestroy {
  comment: Comment;
  editCommentSub: Subscription;

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getComment();
  }

  getComment() {
    // tslint:disable-next-line: no-string-literal
    this.comment = this.route.snapshot.data['comment'].comment;
  }

  goBack() {
    this.location.back();
  }

  editComment(comment: Comment) {
    this.editCommentSub = this.commentService.editComment(this.comment._id, comment).subscribe(_ => this.location.back());
  }

  ngOnDestroy() {
    if (this.editCommentSub) {
      this.editCommentSub.unsubscribe();
    }
  }
}
