import { PredictionComponent } from './blog/prediction/prediction.component';
import { AddCommentComponent } from './blog/add-comment/add-comment.component';
import { PostsComponent } from './blog/posts/posts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './blog/home/home.component';
import { AnalysisComponent } from './blog/analysis/analysis.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: PostsComponent},
  { path: 'add-post', component: AddCommentComponent},
  { path: 'predictions', component: PredictionComponent},
  { path: 'reviews', component: AnalysisComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
