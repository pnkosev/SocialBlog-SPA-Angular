import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Post } from '../shared/models/post';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[];

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.posts = this.route.snapshot.data.allPosts.posts;
  }

}
