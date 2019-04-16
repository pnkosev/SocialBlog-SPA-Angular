import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/core/services/user.service';
import { CommentService } from './../../../core/services/comment.service';
import { Comment } from './../../shared/models/comment';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  comment: Comment;
  isAdmin: boolean;
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
    this.buildForm();
    this.isAdmin = this.userService.isAdmin();
  }

  buildForm() {
    this.form = this.fb.group({
      content: [this.comment.content, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]]
    });
  }

  getComment() {
    // tslint:disable-next-line: no-string-literal
    this.comment = this.route.snapshot.data['comment'].comment;
  }

  goBack() {
    this.location.back();
  }

  editComment() {
    if (this.form.valid) {
      this.editCommentSub = this.commentService.editComment(this.comment._id, this.form.value).subscribe(_ => this.location.back());
    }
  }

  ngOnDestroy() {
    if (this.editCommentSub) {
      this.editCommentSub.unsubscribe();
    }
  }
}
