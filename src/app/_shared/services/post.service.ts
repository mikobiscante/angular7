import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';

import { Observable } from 'rxjs';

@Injectable()
export class PostService {
  url: string;

  constructor(private http: HttpClient) { 
    this.url = '/posts';
  }

  post(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.url}`, post);
  }

  get(post): Observable<Post> {
    post = post.id || post;
    return this.http.get<Post>(`${this.url}/${post}`);
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}`);
  }

  update(post): Observable<Post> {
    return this.http.put<Post>(`${this.url}/${post.id}`, post);
  }

  delete(post): Observable<Post> {
    post = post.id || post;
    return this.http.delete<Post>(`${this.url}/${post}`);
  }
}
