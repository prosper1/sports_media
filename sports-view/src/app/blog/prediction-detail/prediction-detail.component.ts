import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-prediction-detail',
  templateUrl: './prediction-detail.component.html',
  styleUrls: ['./prediction-detail.component.css']
})
export class PredictionDetailComponent implements OnInit {
  sharedData = {
    author: 2,
    introduction: "hhdhdhdh",
    team1: "Barcelona",
    team2: "Madrid",
    goals_halftime: "0:0",
    goals_fulltime: "1:0",
    conclusion: "jdjdjdjd",
    match_date: "2021-01-02T21:21:32Z",
    actual_score: "1:0"
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostsService,
    private title: Title,
    private metaTagService: Meta
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const result = this.router.getCurrentNavigation().extras.state.post;
        this.sharedData = result[0];
      }
      else {
        const postId = this.route.snapshot.params.id;
        this.postService.getPrediction(postId).subscribe(data => {
          this.sharedData = data;
        });
      }
    });
   }

  ngOnInit(): void {
    this.title.setTitle(
      this.sharedData.team1 + '-VS-' + this.sharedData.team2 + ' | Sports Roulette');
    this.metaTagService.updateTag({
       name: 'description',
       content: this.sharedData.introduction
      });
  }

}
