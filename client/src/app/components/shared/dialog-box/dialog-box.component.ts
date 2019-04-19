import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Post } from '../models/post.model';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  contentToShow: string;
  contentLength = 50;
  step = 250;
  showReadMoreBtn = true;
  showReadLessBtn = false;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string, post?: Post }
  ) { }

  ngOnInit() {
    if (this.data.post) {
      this.contentToShow = this.data.post.content.substring(0, this.contentLength);
    }
  }

  readMore() {
    this.contentLength += this.step;
    this.contentToShow = this.data.post.content.substring(0, this.contentLength);
    if (this.contentLength >= this.data.post.content.length || this.contentLength > 500) {
      this.showReadMoreBtn = false;
      this.showReadLessBtn = true;
    }
  }

  readLess() {
    this.contentLength = 50;
    this.contentToShow = this.data.post.content.substring(0, 50);
    this.showReadMoreBtn = true;
    this.showReadLessBtn = false;
  }

  onNoClick(): void {
    this.dialogRef.close('no');
  }

  onYesClick(): void {
    this.dialogRef.close('yes');
  }

}
