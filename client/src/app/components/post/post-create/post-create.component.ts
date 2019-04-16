import { Component, OnInit, OnDestroy } from '@angular/core';

import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { PostService } from './../../../core/services/post.service';
import { Post } from './../../shared/models/post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {
  createPostSub: Subscription;

  constructor(
    private postService: PostService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  createPost(post: Post) {
    this.createPostSub = this.postService.postCreatePost(post).subscribe(_ => this.location.back());
  }

  ngOnDestroy() {
    if (this.createPostSub) {
      this.createPostSub.unsubscribe();
    }
  }

}
