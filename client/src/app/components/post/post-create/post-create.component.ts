import { Post } from './../../shared/models/post';
import { Component, OnInit } from '@angular/core';

import { PostService } from './../../../core/services/post.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(
    private postService: PostService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  createPost(post: Post) {
    this.postService.postCreatePost(post).subscribe(_ => this.location.back());
  }

}
