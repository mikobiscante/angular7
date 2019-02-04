import { Component, OnInit } from '@angular/core';
import { PostService } from '../../_shared/services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Post } from '../../_shared/models/post';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {
  post: Post;
  private postId: number | string;

  constructor(private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');

    this.getPostById(this.postId);
  }

  getPostById(id) {
    this.postService.get(id).pipe(first()).subscribe(data => {
      this.post = data;
    })
  }

}
