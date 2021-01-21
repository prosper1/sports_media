import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  sharedData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostsService,
    private title: Title,
    private metaTagService: Meta,
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
        })
    }

  ngOnInit(): void {
  }

}
