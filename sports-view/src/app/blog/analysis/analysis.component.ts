import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
    this.getReviews()
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
