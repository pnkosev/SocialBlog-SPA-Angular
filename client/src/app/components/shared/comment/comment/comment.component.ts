import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UserService } from './../../../../core/services/user.service';
import { CommentService } from './../../../../core/services/comment.service';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Output() deleteCommentEmitter = new EventEmitter();
  isAuthor: boolean;
  isAdmin: boolean;

  constructor(
    private userService: UserService,
    private commentService: CommentService,
  ) { }

  ngOnInit() {
    this.isAuthor = this.comment._id === this.userService.userId;
    this.isAdmin = this.userService.isAdmin();
  }

  deleteComment() {
    this.deleteCommentEmitter.emit(this.comment._id);
  }

}
