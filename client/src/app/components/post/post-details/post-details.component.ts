import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { PostService } from './../../../core/services/post.service';
import { UserService } from './../../../core/services/user.service';
import { Post } from 'src/app/components/shared/models/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: Post;
  isAuthor: boolean;
  isAdmin: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.post = this.route.snapshot.data.post.post;
    this.isAuthor = this.post.creator._id === this.userService.userId;
    this.isAdmin = this.userService.isAdmin();
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe(_ => this.router.navigate(['home']));
  }

  like() {
    this.postService.likePost(this.post._id).subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.post = data['post'];
    });
  }

  hate() {
    this.postService.hatePost(this.post._id).subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.post = data['post'];
    });
  }

}
