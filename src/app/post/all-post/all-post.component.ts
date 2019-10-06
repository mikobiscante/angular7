import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/_shared/services/post.service';
import { Post } from 'src/app/_shared/models/post';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.scss']
})
export class AllPostComponent implements OnInit {
  posts: Post[]

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAll().pipe(first()).subscribe(posts => {
      this.posts = posts;
    });
  }

  viewPost(post){
    console.log(post);
    this.router.navigate([`/post/${post.id}`]);
  }

  onEdit(post) {
    console.log(post);
  }

  onDelete(post) {
    this.postService.delete(post).pipe(first()).subscribe(() => {
      this.getAllPosts();
      console.log('Successfully deleted record.');
    });
  }
}
