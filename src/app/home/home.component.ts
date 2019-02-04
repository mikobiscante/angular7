import { Component, OnInit } from '@angular/core';
import { PostService } from '../_shared/services/post.service';
import { Post } from '../_shared/models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[]

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
  }

}
