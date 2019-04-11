import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../../shared/models/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  posts: Post[];

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.posts = this.route.snapshot.data.userPosts;
  }

}
