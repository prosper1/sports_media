import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.css']
})
export class AnalysisDetailComponent implements OnInit {

  sharedData = {
    id: 1,
    author: "xxxxx",
    title: "xxxxxx",
    discription: "xxxxx",
    model_pic: "xxxxxx",
    content: "xxxx",
    created_date: "2020-12-07T17:34:30Z",
    subscription: [1],
    published_date: "2020-12-07T17:35:25Z",
    category: 'cat',
    keywords:['cat']
  };
  comments = [];
  commentCounter = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostsService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const result = this.router.getCurrentNavigation().extras.state.review;
        this.sharedData = result[0];
      }
      else {
        const postId = this.route.snapshot.params.id;
        this.postService.getReview(postId).subscribe(data => {
          this.sharedData = data;
        });
      }
    });

    this.getComment()
   }

  ngOnInit(): void {
  }

  getComment(): void {
    this.postService.getComments(this.sharedData.id,'').subscribe(data => {
      this.comments = data;
      this.commentCounter = data.length;
    });
  }

}
