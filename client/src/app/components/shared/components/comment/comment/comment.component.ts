import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { UserService } from './../../../../../core/services/user.service';
import { DialogBoxComponent } from '../../../dialog-box/dialog-box.component';
import { Comment } from '../../../models/comment';

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
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isAuthor = this.comment.creator._id === this.userService.userId;
    this.isAdmin = this.userService.isAdmin();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: { name: 'comment' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.deleteComment();
      }
    });
  }

  deleteComment() {
    this.deleteCommentEmitter.emit(this.comment._id);
  }

  approveComment() {
    this.approveCommentEmitter.emit(this.comment._id);
  }

}
