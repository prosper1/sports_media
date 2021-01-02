import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PostsComponent } from './blog/posts/posts.component';
import { HomeComponent } from './blog/home/home.component';
import { AddPostComponent } from './blog/add-post/add-post.component';
import { PredictionComponent } from './blog/prediction/prediction.component';
import { AnalysisComponent } from './blog/analysis/analysis.component';
import { CommentsComponent } from './blog/comments/comments.component';
import { AddCommentComponent } from './blog/add-comment/add-comment.component';
import { PostDetailComponent } from './blog/post-detail/post-detail.component';
import { AnalysisDetailComponent } from './blog/analysis-detail/analysis-detail.component';
import { PredictionDetailComponent } from './blog/prediction-detail/prediction-detail.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { PostviewComponent } from './blog/postview/postview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    FooterComponent,
    PostsComponent,
    HomeComponent,
    AddPostComponent,
    PredictionComponent,
    AnalysisComponent,
    CommentsComponent,
    AddCommentComponent,
    AnalysisDetailComponent,
    PredictionDetailComponent,
    PostviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    NavComponent,
    FooterComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
