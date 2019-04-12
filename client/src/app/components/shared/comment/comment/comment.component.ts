import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UserService } from './../../../../core/services/user.service';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Output() deleteCommentEmitter = new EventEmitter();
  @Output() approveCommentEmitter = new EventEmitter();
  isAuthor: boolean;
  isAdmin: boolean;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.isAuthor = this.comment.creator._id === this.userService.userId;
    this.isAdmin = this.userService.isAdmin();
  }

  deleteComment() {
    this.deleteCommentEmitter.emit(this.comment._id);
  }

  approveComment() {
    this.approveCommentEmitter.emit(this.comment._id);
  }

}
