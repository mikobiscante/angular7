import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PostService } from '../../_shared/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Post } from '../../_shared/models/post';
declare var $: any;

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit, AfterViewInit {
  post: Post;
  private postId: number | string;

  constructor(private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');

    this.getPostById(this.postId);
  }

  ngAfterViewInit() {
    // On scrollTop over 100, show back to top button
    $(window).scroll(function () {
      const btn = $('.back-to-top');
      const scrollTop = $(window).scrollTop();
      if (scrollTop > 100) {
        btn.addClass('d-flex');
      } else {
        btn.removeClass('d-flex');
      }
    });

  }

  // On click button backt top top, scrollTop to 0
  backToTop(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
  }


  getPostById(id) {
    this.postService.get(id).pipe(first()).subscribe(data => {
      this.post = data;
    });
  }

}
