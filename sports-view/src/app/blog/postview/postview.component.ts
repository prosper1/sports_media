import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.css']
})
export class PostviewComponent implements OnInit {

  sharedData = {
    id: 1,
    author: "xxxxx",
    title: "xxxxxx",
    discription: "xxxxx",
    model_pic: "media url",
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
        this.postService.getPost(postId).subscribe(data => {
          this.sharedData = data;
        });
      }
    });

    this.title.setTitle(this.sharedData.title + ' | Sports Roulette');
    this.metaTagService.updateTag(
      { name: 'description', content: this.sharedData.discription }
    );

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
