import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';

import { Post } from '../shared/models/post';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  activePosts: Post[];
  length: number;
  pageSizeOptions: number[] = [6, 12, 24];
  pageSize = this.pageSizeOptions[0];
  pageEvent: PageEvent;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.posts = this.route.snapshot.data.allPosts.posts;
    this.length = this.posts.length;
    this.activePosts = this.posts.slice(0, this.pageSize);
  }

  onPageChange(e: PageEvent) {
    const firstCut = e.pageIndex * e.pageSize;
    const secondCut = firstCut + e.pageSize;
    this.activePosts = this.posts.slice(firstCut, secondCut);
  }
}
