import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  reviews = [];
  constructor(
    private router: Router,
    private postService: PostsService,
    private title: Title,
    private metaTagService: Meta
  ) { }

  ngOnInit(): void {
    this.getReviews()
    this.title.setTitle('Sports Reviews and Analysis | Sports Roulette');
    this.metaTagService.updateTag(
      { name: 'description', content: "Analyzing post sport matches" }
    );
  }

  getReviews(): void{
    this.postService.getReviews().subscribe(data => {
      this.reviews = data;
    });
  }

  goto(id: any): void {
    const filteredReviews = this.reviews.filter(review => review.id === id);
    const navigationExtras: NavigationExtras = {
      state: {
        review: filteredReviews
      }
    };
    this.router.navigate(['/reviews/view/', id], navigationExtras);
  }


}
