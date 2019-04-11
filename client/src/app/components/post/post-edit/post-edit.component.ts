import { UserService } from './../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { PostService } from './../../../core/services/post.service';
import { Post } from '../../shared/models/post';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post: Post;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.post = this.route.snapshot.data.post.post;
  }

  editPost(newPost: Post) {
    this.postService.editPost(this.post._id, newPost).subscribe(_ =>
      this.userService.isAdmin() ? this.location.back() : this.router.navigate(['home'])
    );
  }

}
