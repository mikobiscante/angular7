import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { PostComponent } from './post.component';
import { AllPostComponent } from './all-post/all-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';

export const routes: Routes = [
  {
    path: '',
    component: PostComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: AllPostComponent },
      { path: 'create', component: CreatePostComponent },
      { path: ':id', component: ViewPostComponent },
      { path: 'edit/:id', component: EditPostComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
