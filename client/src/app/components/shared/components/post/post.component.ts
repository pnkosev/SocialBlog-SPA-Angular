import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Post } from '../../models/post.model';
import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post: Post;
  @Output() deletePostEmitter = new EventEmitter();
  @Output() approvePostEmitter = new EventEmitter();

  constructor(
    public dialog: MatDialog
  ) { }

  deletePost() {
    this.deletePostEmitter.emit(this.post._id);
  }

  approvePost() {
    this.approvePostEmitter.emit(this.post._id);
  }

  openDialogDetails() {
    this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: { name: 'post-details', post: this.post },
    });
  }

  openDialogDelete() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: { name: 'post' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.deletePost();
      }
    });
  }

}
