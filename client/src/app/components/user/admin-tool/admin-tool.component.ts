import { Component, OnInit } from '@angular/core';

import { PostService } from './../../../core/services/post.service';
import { CommentService } from './../../../core/services/comment.service';

@Component({
  selector: 'app-admin-tool',
  templateUrl: './admin-tool.component.html',
  styleUrls: ['./admin-tool.component.css']
})
export class AdminToolComponent implements OnInit {

  constructor(
    private postService: PostService,
    private commentService: CommentService,
  ) { }

  ngOnInit() {
  }

}
