import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.css']
})
export class PostviewComponent implements OnInit {

  sharedData:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostsService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const result = this.router.getCurrentNavigation().extras.state.post;
        this.sharedData = result[0];
      }
      else {
        const postId = this.route.snapshot.params.id;
        this.postService.getPost(postId).subscribe(data => {
          this.sharedData = data;
        });
      }
      });
   }

  ngOnInit(): void {
  }

}
