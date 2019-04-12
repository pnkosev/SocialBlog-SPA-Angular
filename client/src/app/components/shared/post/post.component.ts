import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Output() deletePostEmitter = new EventEmitter();
  @Output() approvePostEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deletePost() {
    this.deletePostEmitter.emit(this.post._id);
  }

  approvePost() {
    this.approvePostEmitter.emit(this.post._id);
  }

}
