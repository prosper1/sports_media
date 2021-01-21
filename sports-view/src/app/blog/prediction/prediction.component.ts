import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {
  predictions = [];

  constructor(
    private postService: PostsService,
    private router: Router,
    private title: Title,
    private metaTagService: Meta
  ) { }

  ngOnInit(): void {
    this.getPredictions()
    this.title.setTitle('View Sports Prediction | Sports Roulette');
    this.metaTagService.updateTag(
      { name: 'description', content: 'Get the odds of your favourite team through our predictions' }
    );
  }


  getPredictions(): void{
    this.postService.getPredictions().subscribe(data => {
      this.predictions = data;
    });
  }

  goto(id: any): void {
    const filteredPredictions = this.predictions.filter(post => post.id === id);
    const navigationExtras: NavigationExtras = {
      state: {
        prediction: filteredPredictions
      }
    };
    this.router.navigate(['/predictions/view/', id], navigationExtras);
  }

}
