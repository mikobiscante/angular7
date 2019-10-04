import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class PostBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // get array posts in local storage
    let posts: any[] = JSON.parse(localStorage.getItem('posts')) || [];

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // get posts
      if (request.url.endsWith('/posts') && request.method === 'GET') {
        return of(new HttpResponse({ status: 200, body: posts }));
      }

      // get post by id
      if (request.url.match(/\/posts\/\d+$/) && request.method === 'GET') {
        // find post by id in posts array
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        let matchedPosts = posts.filter(post => { return post.id === id; });
        let post = matchedPosts.length ? matchedPosts[0] : null;

        return of(new HttpResponse({ status: 200, body: post }));
      }

      // create post
      if (request.url.endsWith('/posts') && request.method === 'POST') {
        let newPost = request.body;

        // validation
        let duplicatePost = posts.filter(post => { return post.title === newPost.title; }).length;
        if (duplicatePost) {
          return throwError({ error: { message: 'Title "' + newPost.title + '" is already exist' } });
        }

        // save new post
        newPost.id = Math.floor(100000000 + Math.random() * 900000000);
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));

        // respond 200 OK
        return of(new HttpResponse({ status: 200 }));
      }

      // put post
      if (request.url.match(/\/posts\/\d+$/) && request.method === 'PUT') {
        let updatePost = request.body;

        // validation
        let duplicatePost = posts.filter(post => (post.title === updatePost.title && post.id !== updatePost.id)).length;
        if (duplicatePost) {
          return throwError({ error: { message: 'Title "' + updatePost.title + '" is already exist' } });
        }

        // find post by id in posts array
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        for (let i = 0; i < posts.length; i++) {
          let post = posts[i];
          if (post.id === id) {
            posts[i] = updatePost;
            localStorage.setItem('posts', JSON.stringify(posts));
            break;
          }
        }

        // respond 200 OK
        return of(new HttpResponse({ status: 200 }));
      }

      // delete post
      if (request.url.match(/\/posts\/\d+$/) && request.method === 'DELETE') {
        // find post by id in posts array
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        for (let i = 0; i < posts.length; i++) {
          let post = posts[i];
          if (post.id === id) {
            // delete post
            posts.splice(i, 1);
            localStorage.setItem('posts', JSON.stringify(posts));
            break;
          }
        }

        // respond 200 OK
        return of(new HttpResponse({ status: 200 }));
      }

      // pass through any requests not handled above
      return next.handle(request);

    }))

      // call materialize and dematerialize to ensure delay even if an error is thrown
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}