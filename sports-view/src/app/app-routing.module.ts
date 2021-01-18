import { PredictionComponent } from './blog/prediction/prediction.component';
import { AddCommentComponent } from './blog/add-comment/add-comment.component';
import { PostsComponent } from './blog/posts/posts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './blog/home/home.component';
import { AnalysisComponent } from './blog/analysis/analysis.component';
import { PostviewComponent } from './blog/postview/postview.component';
import { PredictionDetailComponent } from './blog/prediction-detail/prediction-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AnalysisDetailComponent } from './blog/analysis-detail/analysis-detail.component';
import { DabatedebatesComponent } from './dabatedebates/dabatedebates.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: PostsComponent},
  { path: 'posts/view/:id', component: PostviewComponent },
  { path: 'add-post', component: AddCommentComponent},
  { path: 'predictions', component: PredictionComponent},
  { path: 'predictions/view/:id', component: PredictionDetailComponent},
  { path: 'reviews', component: AnalysisComponent},
  { path: 'reviews/view/:id', component: AnalysisDetailComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'debate', component: DabatedebatesComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {scrollPositionRestoration: 'enabled'}
      ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
