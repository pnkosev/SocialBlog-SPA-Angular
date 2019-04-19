import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material';

import { Post } from '../../shared/models/post.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
    this.posts = this.route.snapshot.data.userPosts;
    this.length = this.posts.length;
    this.activePosts = this.posts.slice(0, this.pageSize);
  }

  onPageChange(e: PageEvent) {
    const firstCut = e.pageIndex * e.pageSize;
    const secondCut = firstCut + e.pageSize;
    this.activePosts = this.posts.slice(firstCut, secondCut);
  }

}
