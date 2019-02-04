import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { PostService } from '../../_shared/services/post.service';
import { Post } from '../../_shared/models/post';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  post: Post;
  postId: string | number;
  postForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');

    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      image: [null]
    });

    this.getPostById(this.postId);

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.postForm.controls; }

  getPostById(id) {
    this.postService.get(id).pipe(first()).subscribe(data => {
      this.post = data;
      this.postForm.patchValue({
        title: this.post.title,
        body: this.post.body
      });
    })
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.postForm.invalid) {
      return;
    }

    this.loading = true;
    this.post.title = this.f.title.value;
    this.post.body = this.f.body.value;
    this.post.image = this.f.image.value ? this.f.image.value : this.post.image;
    this.post.updatedDate = new Date();
    this.postService.update(this.post).pipe(first()).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.loading = false;
        console.log(error);
      });
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.postForm.patchValue({
          image: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

}
