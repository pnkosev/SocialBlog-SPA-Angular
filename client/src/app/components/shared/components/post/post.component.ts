import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Post } from '../../models/post';
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
  // contentToShow: string;
  // contentLength = 50;
  // step = 250;
  // showReadMoreBtn = true;
  // showReadLessBtn = false;

  constructor(
    public dialog: MatDialog
  ) { }

  // ngOnInit() {
  //   this.contentToShow = this.post.content.substring(0, this.contentLength);
  // }

  deletePost() {
    this.deletePostEmitter.emit(this.post._id);
  }

  approvePost() {
    this.approvePostEmitter.emit(this.post._id);
  }

  // readMore() {
  //   this.contentLength += this.step;
  //   this.contentToShow = this.post.content.substring(0, this.contentLength);
  //   if (this.contentLength >= this.post.content.length) {
  //     this.showReadMoreBtn = false;
  //     this.showReadLessBtn = true;
  //   }
  // }

  // readLess() {
  //   this.contentLength = 50;
  //   this.contentToShow = this.post.content.substring(0, 50);
  //   this.showReadMoreBtn = true;
  //   this.showReadLessBtn = false;
  // }

  openDialog() {
    this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: { name: 'post-details', post: this.post },
    });
  }

}
